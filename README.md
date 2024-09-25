# Pdf Parser.

**Project Summary:**  Extract text, links from password protected pdf and non password protected pdf using apache tika server.

### Prerequisites
- Node.js (v20 or later)
- Java 21 

### Quick Start

**Step 1.**
Clone pdfparser

```bash
git clone https://github.com/Prak-NodeJs/pdfparser.git
```

**Step 2.**
Navigate into the project directory

```bash
cd pdfparser
```
**Step 3.**
Install dependencies

```bash
npm install
```

**Step 4.**
Create .env file and set the environment variables

```bash
cp example.env .env
# open .env and modify the environment variables (if needed)
```

**step 5.**
Download tika server jar file from here https://archive.apache.org/dist/tika/2.2.1/  and put that file into root directory.
Please download this file 'tika-server-standard-2.2.1.jar' file only.
Java version 21 should be installed in your system and JAVA_HOME and path should be setup in the system environment varibale.

Tika Server-> Apache Tika is a content analysis toolkit that detects and extracts metadata and structured text content from various file types. It can handle a wide range of file formats, such as PDFs, Microsoft Office documents, images, HTML, and even multimedia files. Apache Tika is often used in data processing workflows for indexing, searching, and analyzing large volumes of diverse file formats.

## Usage
To run the tika server, open new terminal and use the following command:

```bash
java -jar tika-server-standard-2.2.1.jar 
```

To run the server, use the following command:

```bash
npm start

```
This will start the server at http://localhost:port.


### Endpoints

**POST /api/parse:**
   - Extract text, link and images from the pdf and return extracted_text view link.
      Accepts the following parameters in form data:
      - file: Accept only pdf file.
      - password: this is optional parameter, if pdf is password protected then pass password.

     
