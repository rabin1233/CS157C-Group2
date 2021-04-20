const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const dotenv = require('dotenv');

require('dotenv/config');

//dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const productsRoute = require('./routes/Products');
const userRoute = require('./routes/auth');
app.use('/products', productsRoute);
app.use('/user', userRoute);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true} , ()=>{
    console.log('connected to DB!');
});


app.get('/', (req, res) => {
    res.send('We are on home');
});


app.listen(3000);