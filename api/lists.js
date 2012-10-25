module.exports = function(app, db) {
  require('./define_models')(db)

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

};