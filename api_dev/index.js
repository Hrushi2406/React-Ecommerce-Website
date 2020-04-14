const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
//Routes Import
const { login, signUp } = require('./routes/authRoutes')
const { home, viewAll } = require('./routes/dataRoutes')

//Middleware
const verifyAuth = require('./utils/authMiddleware')

var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(cors())

//PORT
const PORT = process.env.PORT || 5000



//ROUTES
app.post('/api/login', login)
app.post('/api/signUp', signUp)
app.get('/api/', home)
app.get('/api/products/:key', viewAll)







//SERVER
app.listen(PORT, () => console.log("Api's Up and Running"))