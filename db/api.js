module.exports = {
  users: {
    createUser: function(db, data) {
      return db.collection('users').insertOne({
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email": data.email,
        "tasks" : []
      })
    },
    getUser: function(db, userID) {
      return db.collection('users').find( { "_id": userID } ).toArray()
    },
    updateUser: function(db, userID, data) {
      return db.collection('users').update(
        { _id: userID },
        {
          $set: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
          }
        }
      )
    },
    deleteUser: function(db, userID) {
      return db.collection('users').deleteOne( { "_id": userID })
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
