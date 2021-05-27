const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 8080

//setting the view engines to use ejs
app.set('view engine', 'ejs')


//setting up port 
app.listen(process.env.PORT, () => {
    console.log('music playing on port 8080')
})

app.get('/', (req, res) =>{
    res.render('index.ejs')
})
app.post('/link', (req, res) => {
    res.send()
})