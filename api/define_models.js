module.exports = function(db) {
  exports.Task = db.model('Task', mongoose.Schema({ name: 'string' }));
  exports.List = db.model('List', mongoose.Schema({ name: 'string' }));  
}