const express = require('express')
const parseRouter = express.Router()
const {uploadFile}= require('../middleware/multer')
const {parsePdf} = require('../controller/pdfparser.controller')

parseRouter.post('/parse', uploadFile, parsePdf)

module.exports = {
    parseRouter
}