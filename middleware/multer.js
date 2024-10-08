const multer = require('multer');

//setup storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

// only pdf file is allowed
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype==='application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true); 
    } else {
        cb(new Error('Only PDF and Docx files are allowed'), false); 
    }
};

// upload file limit is 100 mb only.
const upload = multer({
    storage: storage,
    limits:{
        fileSize:100*1024*1024
    },
    fileFilter: fileFilter
});

const uploadFile = (req, res, next) => {
    upload.fields([{ name: 'file', maxCount: 1 }])(req, res, function (err) {
        if (err) {
            return res.status(400).json({ 
                success:false,
                message:err.message
             });
        }
        next();
    });
};

module.exports = {
    uploadFile
};
