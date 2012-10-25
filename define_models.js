module.exports = function(db) {
  mongoose = require('mongoose');

  exports.Task = db.model('Task', mongoose.Schema({ name: 'string' }));
  exports.List = db.model('List', mongoose.Schema({ name: 'string' }));
}