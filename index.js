const express = require('express') // to handle CRUD API
const app = express();
const dotenv = require('dotenv')
const MongoClient = require('mongodb').MongoClient
const connectDB = require('./config/config') //to connect to our database
const mongoose = require('mongoose') // to talk to the database
const passport = require('passport') // to talk to the microsoft identity platform
const session = require('express-session') // to stay logged in across pages
const MongoDBStore = require('connect-mongodb-session')(session) // passes session into the database
const methodoverride = require('method-override')
require('dotenv').config({path: "./config/.env"})

//importing routers
const mainRoutes = require('./Routes/mainRoutes')
const musicPostRoutes = require('./Routes/musicRoutes')

//passport config
require('./config/passport')(passport)

connectDB()



/* -------Middleware -------*/

//Morgan is a logger for development - it logs some data requests made to the server in the console. https://www.npmjs.com/package/morgan
app.use(require('morgan')('dev'))


//cookies or sessions - research this
app.set('truse proxy', 1)
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoDBStore({ mongooseConnection: mongoose.connection }),
    })
)

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//method override = allows PUT/DELETE in form methods
app.use(methodoverride('_method'))

//setting the view engines to use ejs
app.set('view engine', 'ejs')

//telling express where to find static files
app.use(express.static('public'))

//this helps our server deal with JSON data sent as the request body with a POST or PUT request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//using the ROUTES
app.use(mainRoutes) // any generic request goes through this route
app.use('/addMusic', musicRoutes) // to add music, use this route


//setting up port 
app.listen(process.env.PORT, () => {
    console.log('Music is playing on port 8080')
})
