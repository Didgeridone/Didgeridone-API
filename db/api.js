var ObjectID = require('mongodb').ObjectID

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
      return db.collection('users').find( { "_id": ObjectID(userID) } ).toArray()
    },
    updateUser: function(db, callback) {

    },
    deleteUser: function(db, callback) {

    }
  },
  tasks: {
    createTask: function(db, userID, data) {
      console.log(data)
     return db.collection('users').update(
        {_id: ObjectID(userID)},
        {$push: {tasks: data}}
      )
    },
    getTasks: function(db, userID, data) {
      return db.collection('users').find( {"_id": ObjectID(userID) } ).toArray()
    },
    updateTask: function(db, userID, taskID) {
      return db.collection('users').updateOne(
        {_id: userID},
        {$set: {tasks: data}}
      )
    },
    deleteTask: function(db, userId, data) {
      return db.collection('users').updateOne(
          {_id: userID},
          {$set: {tasks: data.tasks}}
        )
    }
  }
}
