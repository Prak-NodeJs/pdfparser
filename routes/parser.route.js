const express = require('express')
const parseRouter = express.Router()
const {uploadFile}= require('../middleware/multer')
const {extractPdf, scrapeWebsiteContent} = require('../controller/parser.controller')
const {validate} = require('../middleware/helper')
const { validateWebRequest,validatePdfRequest} = require('../validation/parser.validation')

parseRouter.post('/pdf/extract', uploadFile, validate(validatePdfRequest), extractPdf)
parseRouter.post('/website/scrape',validate( validateWebRequest), scrapeWebsiteContent)


module.exports = {
    parseRouter
}