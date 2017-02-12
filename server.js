'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth-connect');
var mysql = require('mysql');
var conf = require('./server/config');
var pool = mysql.createPool(conf);
var flowers = require('./server/Models/FlowersModel')(pool);
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

app.get('/flowers_admin/save', auth, function (req, res) {
  res.render('./partial/admin_new.ejs');
});

app.post('/flowers_admin/save', auth, function (req, res) {
	if (req.body !== null) {
  		var obj = req.body;

  		if(obj.isActive === 'on') {
  			obj.isActive = 1;
  			obj.dateActivation = new Date();
  		} else {
  			obj.isActive = 0;
  		}

  		obj.id = Guid();
  		obj.dateCreate = new Date();

  		try {
			    flowers.Save( obj, function (error, data) {
		        if (!error)
		          res.json({ type: 'success' });
		        else
		          res.json({ type: 'error' });
	      	});
  		} catch(e) {
		    console.log(e);
		    res.json({ type: 'error' });
		  }
  	} else {
  		res.json({ type: 'error' });
  	}
});

app.get('/flowers_admin/get', auth, function (req, res) {
  try {
    flowers.Get(function (error, data) {
      if (!error) {
        //res.json({ flowers: data });
        res.render('./partial/admin_list.ejs', { flowers: data });
      }
      else
        return null;
    })
  } catch(e) {
    return null;
  }
});

app.post('/flowers_admin/SaveChange', auth, function (req, res) {
  try {
    if (req.body !== null) {
      var obj = req.body;
      var isA = Number(obj.isActive);
      
      if(isA === 1)
        obj.dateActivation = new Date();
      else
        obj.dateActivation = null;

      flowers.SaveChange([isA, obj.dateActivation, obj.id], function (error, data) {
          if (!error)
            res.json({ type: 'success' });
          else
            res.json({ type: 'error' });
      });
    } else {
      res.json({ type: 'error' });
    }
  } catch(e) {
    res.json({ type: 'error' });
  }
});

app.post('/flowers_admin/Delete', auth, function (req, res) {
  try {
    if (req.body !== null) {
      var obj = req.body;

      flowers.Delete(obj.id, function (error, data) {
          if (!error)
            res.json({ type: 'success' });
          else
            res.json({ type: 'error' });
      });
    } else {
      res.json({ type: 'error' });
    }
  } catch(e) {
    res.json({ type: 'error' });
  }
});

function Guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

app.listen(8081, function () {
  console.log('Server successfully started on 8081 port');
});
