const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const path = require('path');
const mongoose = require('mongoose');
var app = express();

// Connects to the mongo db
var mongoDB = 'mongodb://localhost/portfolio_new';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setting up the DB
var stockSchema = mongoose.Schema({
    user: String,
    name: String,
    ticker: String,
    purchased_price: Number,
    purchased_shares: Number,
    date: String
});

// Create the Stock class in the database
var Stock = mongoose.model("Stock", stockSchema);

// If running on a VM sets port otherwise port is default 8080
var port = Number(process.env.PORT || 8080);

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// for parsing multipart/form-data
app.use(upload.array());

// for using static files such as /js or /css
app.use('/public', express.static('public'));

// allows cross domain requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/views/main.html'));
});

app.get('/login', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get('/stocks', function(req, res, next) {
    Stock.find({'user': 'Pranay'}, function(err, response) {
        if (err) {
            res.send({'error': 1});
        } else {
            res.send(response);
        }
    });
});

app.post('/portfolio', function(req, res) {
    var stockdata = req.body;

    var newStock = new Stock({
        user: stockdata['user'],
        name: stockdata['name'],
        ticker: stockdata['ticker'],
        purchased_price: stockdata['bought'],
        purchased_shares: stockdata['shares'],
        date: stockdata['purchase_date']
    });

    newStock.save(function(err) {
        if (err) {
            res.send({"error": 1});
        }
        res.send({"success": 1});
    });
});

app.listen(port);
