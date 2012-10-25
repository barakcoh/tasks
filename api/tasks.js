module.exports = function(app, db) {    
  require('./define_models')(db)

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

};