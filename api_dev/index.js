const express = require('express')
const bodyParser = require('body-parser')

//Routes Import
const { login, signUp } = require('./routes/authRoutes')



var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//PORT
const PORT = process.env.PORT || 5000



//ROUTES
app.post('/login', login)
app.post('/signUp', signUp)





//SERVER
app.listen(PORT, () => console.log("Api's Up and Running"))