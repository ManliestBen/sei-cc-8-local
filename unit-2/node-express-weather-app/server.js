require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(3000, function () {
  console.log('Listening on port 3000')
});

module.exports = app;