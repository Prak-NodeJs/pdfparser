const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({})
const { parseRouter } = require('./routes/pdfparse.route')

const app = express()

//middleware
app.use(express.json())
app.use('/file', express.static(path.join(__dirname, 'outputs')));

//route
app.use('/api',parseRouter )


// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); 
});

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
	console.log(`Server is listening on port number ${PORT}`)
})
