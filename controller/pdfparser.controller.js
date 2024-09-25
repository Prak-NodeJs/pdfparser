const axios = require('axios');
const fs = require('fs')
const unzipper = require('unzipper')
const path = require('path')

//extract text, images and link using tika server and stores india respected folder 
//and create url for viewing extracted content.

const parsePdf = async (req, res, next) => {
    const { password } = req.body;
    if (!req.file) {
        return res.status(400).json({
            status: false,
            message: 'File is required'
        })
    }
    const pdfFilePath = path.resolve(__dirname, '../uploads/', req.file.filename)
    const basename = req.file.filename.split('.')[0]
    const parsingData = fs.createReadStream(pdfFilePath)
    //storing tike server api response
    const outputZipFile = path.resolve(__dirname, '../', basename) + '.zip'
    // for storing extracted files from zip file
    const outPutPath = path.join(__dirname, '../outputs/', basename)
    try {
        const response = await axios.put(process.env.TIKE_SERVER_URL, parsingData, {
            headers: {
                'X-Tika-PDFExtractInlineImages': 'true',
                'X-Tika-PDFExtractUniqueInlineImagesOnly': 'true',
                'password': password ? password : '',
                'X-Tika-Metadata': 'true',
                'Content-Type': 'application/octet-stream',
            },
            responseType: 'arraybuffer',
        })

        console.log('Attempting to convert Tika-server response data to ' + outputZipFile);
        fs.writeFileSync(outputZipFile, response.data);

        const promises = []
        if (fs.existsSync(outputZipFile)) {
            console.log('Tika-server response data saved at ' + outputZipFile);
            const directory = await unzipper.Open.file(outputZipFile);

            if (!fs.existsSync(outPutPath)) {
                fs.mkdirSync(outPutPath);
            }

            for (const file of directory.files) {
                const filePath = path.join(outPutPath, file.path);
                let writeStream;

                if (file.path === '__TEXT__') {
                    //  it's __TEXT__, write it into a .txt file
                    const txtFilePath = path.join(outPutPath, 'extracted_text.txt');
                    writeStream = fs.createWriteStream(txtFilePath);
                } else if (file.path === '__METADATA__' || file.path.endsWith('.png') || file.path.endsWith('.jpg')) {
                    writeStream = fs.createWriteStream(filePath);
                }

                if (writeStream) {
                    const promise = new Promise((resolve, reject) => {
                        file.stream().pipe(writeStream);
                        writeStream.on('finish', () => {
                            resolve();
                        });
                        writeStream.on('error', (err) => {
                            reject(err);
                        });
                    });
                    promises.push(promise);
                }
            }

            //wait for all promises;
            await Promise.all(promises)

            //delete generated zip file and users pdf file
            fs.unlinkSync(outputZipFile)
            fs.unlinkSync(pdfFilePath)

            //construct url for viewing extracted text and link
            const pdfViewUrl = process.env.BASE_URL + '/file/' + basename + '/extracted_text.txt'
            res.status(200).json({
                success: true,
                message: "Pdf Parsed Successfully",
                fileUrl: pdfViewUrl
            })
        }
    } catch (error) {
        if (fs.existsSync(pdfFilePath)) {
            fs.unlinkSync(pdfFilePath)
        }

        res.status(500).json({
            status: false,
            message: 'something went wrong',
            error: error.message ? error.message : error
        })
    }
}

module.exports = {
    parsePdf
}