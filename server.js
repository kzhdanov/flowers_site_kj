'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');
var compression = require('compression');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers',
  'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});

///ГЛАВНАЯ
app.get('/', function (req, res) {
  res.render('index.ejs');
});

///АДМИНИСТРАТИВНАЯ ЧАСТЬ///
var auth = basicAuth('flowers_admin', 'test');

///АДМИНКА
app.get('/flowers_admin/', auth, function (req, res) {
  res.render('admin.ejs');
});

app.listen(8081, function () {
  console.log('Server successfully started on 8081 port');
});
