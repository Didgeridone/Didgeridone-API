var newTasks = [{
name: "Pet Dog",
lat: "lat",
long: "long",
radius: 11,
done: false,
enter: true
}]

module.exports = {
  users: {
    createUser: function(db, callback) {

    },
    getUser: function(db, callback) {

    },
    updateUser: function(db, callback) {

    },
    deleteUser: function(db, callback) {

    }
  },
  tasks: {
    createTask: function(db, callback) {
         return mongo.MongoClient.connect(url, function(err, db){
          var tasks = db.collection('tasks');
          tasks.updateOne(
            {_id: 2},
            {$push: {tasks: newTasks}}
          )
        })

    },
    getTasks: function(db, callback) {
        mongodb.MongoClient.connect(url, function(err, db){
          var tasks = db.collection('tasks');
          tasks.find().toArray(function(err, tasks){
            res.json(tasks)
          })
        })

    },
    updateTask: function(db, callback) {

        mongodb.MongoClient.connect(url, function(err, db){
          var tasks = db.collection('tasks');

          tasks.updateOne(
            {_id: 1},
            {$set: {tasks: newTasks}}
          )
          res.json('Success!')
        })



    },
    deleteTask: function(db, callback) {

      return mongodb.MongoClient.connect(url, function(err, db){
        var tasks = db.collection('tasks');

        tasks.updateOne(
          {_id: 1},
          {$set: {tasks: newTasks}}
        )
        res.json('Success!')
      })

    }
  }
}
