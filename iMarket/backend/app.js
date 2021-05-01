const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const cors = require('cors');
//const dotenv = require('dotenv');

require('dotenv/config');
const {verifyToken} = require('./utils/token');

//dotenv.config();
var corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const PORT = 3001;

const productsRoute = require('./routes/Products');
const userRoute = require('./routes/auth');

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
})
connection.on('err', console.error.bind(console, "Connection Error: "))

app.use(bodyParser.json())
app.set('trust proxy', 1)

app.use(session({
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION}),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
        genid: (req) => genuuid(),
    }
}));

app.use((req, res, next) => {
    if(req.session.user) {
        const decoded = verifyToken(req.session.user);
        req.user = decoded;
    }
    next();
})


app.get('/', (req, res) => {
    res.send('We are on home');
});


app.use('/user', userRoute);
app.use('/products', productsRoute);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});