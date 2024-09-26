const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({})
const { parseRouter } = require('./routes/parser.route')

const app = express()

//middleware
app.use(express.json())
app.use('/file', express.static(path.join(__dirname, 'outputs')));

//route
app.use('/api',parseRouter)


//hanlde unknown routes
app.use((req, res)=>{
    res.status(400).json({
        success:false,
        message:`Not Found - ${req.originalUrl}`
    })
})


// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); 
});

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
	console.log(`Server is listening on port number ${PORT}`)
})
