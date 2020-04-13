const express = require('express')
const bodyParser = require('body-parser')

//Routes Import
const { login, signUp } = require('./routes/authRoutes')
const { home } = require('./routes/userRoutes')

//Middleware
const verifyAuth = require('./utils/authMiddleware')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//PORT
const PORT = process.env.PORT || 5000



//ROUTES
app.post('/login', login)
app.post('/signUp', signUp)
app.get('/', verifyAuth, home)






//SERVER
app.listen(PORT, () => console.log("Api's Up and Running"))