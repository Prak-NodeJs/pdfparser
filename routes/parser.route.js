const express = require('express')
const parseRouter = express.Router()
const {uploadFile}= require('../middleware/multer')
const {extractPdf, scrapeWebsiteContent} = require('../controller/parser.controller')
const {validate} = require('../middleware/helper')
const {validateRequest} = require('../validation/parser.validation')

parseRouter.post('/pdf/extract', uploadFile, extractPdf)
parseRouter.post('/website/scrape',validate(validateRequest), scrapeWebsiteContent)


module.exports = {
    parseRouter
}