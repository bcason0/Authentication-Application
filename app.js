const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db');


//Database
mongoose.connect(config.database);
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database );
});

mongoose.connection.on('error', (e) => {
  console.log('Database error ' + e );
});

const app = express();
const port = process.env.PORT || 8080;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//BP middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//models
const User = require('./models/User');

const users = require('./routes/users');
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log('Server started  ' + port);
});
