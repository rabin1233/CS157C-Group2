const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

const productsRoute = require('./routes/Products');
const userRoute = require('./routes/auth');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log('connected to DB!');
})

app.get('/', (req, res) => {
    res.send('We are on home');
});


app.use('/products', productsRoute);
app.use('/user', userRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});