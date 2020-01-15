const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


dotenv.config();

//Connect to db
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => console.log(err)
);

//Middleware
app.use(express.json());
//Routes Middleware
app.use('/api/user', authRoute);
app.use('/api/dashboard', dashboardRoute);

app.listen(3000, () => console.log("server up and running"));