var TRELLO_API_KEY = "2f13d327138dfc7cf2639332254b9bcd"

var express = require('express'),
    connect = require('connect'),
    batman = require('batman'),
    assets = require('connect-assets'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    mongoose = require('mongoose'),
    app = express()

app.use(express.bodyParser());
app.use(assets({ src: '.' }));
js.root = 'app'

app.use('/batman', express.static('/usr/local/lib/node_modules/batman/lib'));
app.use('/app/views', express.static(__dirname + '/app/views'));

app.set('views', __dirname + '/app');
app.set('view engine', 'jade');

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));   
});

var db = mongoose.createConnection('localhost', 'nodejs_test');
var Task = db.model('Task', mongoose.Schema({ name: 'string', idBoard: 'string' }));
var List = db.model('List', mongoose.Schema({ name: 'string', tasks: 'array' }));

app.get('/', function(req, res){
  res.render('app', { trello_api_key: TRELLO_API_KEY });
});

//require('./api/tasks')(app, db);
//require('./api/lists')(app, db);

// Tasks

app.post('/tasks', function(req, res){      
  new Task(req.body.task).save(function (err, task) {    
    if (err) {
      console.error(err)
    }

    res.json(201, task)
  });
});

app.put('/tasks/:id', function(req, res){      
  Task.findByIdAndUpdate(req.params.id, req.body.task, { upsert: true}, function (err) {    
    if (err) {
      console.error(err)
    }

    res.status(200).end();
  });
});


app.get('/tasks', function(req, res){  
  Task.find(function (err, tasks) {   
    if (err) {
      console.error(err)
    }

    res.send(tasks)
  })
});

// Lists

app.post('/lists', function(req, res){      
  new List(req.body.list).save(function (err, list) {    
    if (err) {
      console.error(err)
    }

    res.json(201, list)
  });
});

app.put('/lists/:id', function(req, res){      
  List.findByIdAndUpdate(req.params.id, req.body.list, { upsert: true}, function (err) {    
    if (err) {
      console.error(err)
    }

    res.status(200).end();
  });
});


app.get('/lists', function(req, res){  
  List.find(function (err, lists) {   
    if (err) {
      console.error(err)
    }

    res.send(lists)
  })
});

app.listen(3000);
console.log('Listening on port 3000');
