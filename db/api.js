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
    createTask: function(db, callback) {

    },
    getTasks: function(db, callback) {

    },
    updateTask: function(db, callback) {

    },
    deleteTask: function(db, callback) {

    }
  }
}
