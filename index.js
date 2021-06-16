const express = require('express') // to handle CRUD API
const app = express();
const dotenv = require('dotenv')
const MongoClient = require('mongodb').MongoClient
const conenctDB = require('./config/database') //to connect to our database
const mongoose = require('mongoose') // to talk to the database
const passport = require('passport') // to talk to the microsoft identity platform
const session = require('express-session') // to stay logged in across pages
const MongoDBStore = require('connect-mongodb-session')(session) // passes session into the database
const methodoverride = require('method-override')
require('dotenv').config({path: "./config/.env"})

//passport config
require('./config/passport')(passport)

// connectDB()

//setting the view engines to use ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//sessions
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

//method override = allows PUT?DELET in form methods
app.use(methodoverride('_method'))

// app.use('/', mainRoutes) // any generic request goes through this route
// app.use('/auth', authRoutes) // if they need to authenticate, use this route
// app.use('/addMusic', musicRoutes) // to add music, use this route

app.get('/', (req, res) => {
    res.render('./index.ejs')
})

//setting up port 
app.listen(process.env.PORT, () => {
    console.log('Music is playing on port 8080')
})
