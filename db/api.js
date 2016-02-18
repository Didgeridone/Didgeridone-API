module.exports = {
  users: {
    createUser: function(db, data) {
      return db.collection('users').insertOne({
        "email": data.email,
        "password": data.password,
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
            email: data.email
          }
        }
      )
    },
    deleteUser: function(db, userID) {
      return db.collection('users').deleteOne( { "_id": userID } )
    },
    findUser: function(db, email) {
      return db.collection('users').find( { "email": email } ).toArray()
    }
  },
  tasks: {
    createTask: function(db, userID, data) {
      return db.collection('users').update(
        { _id: userID },
        { $push: { tasks: data } }
      )
    },
    getTasks: function(db, userID, data) {
      return db.collection('users').find( { "_id": userID } ).toArray()
    },
    getTaskCount: function(db, userID) {
      return db.collection('users').aggregate([
        { $match: { _id: userID } },
        { $project: { count: { $size: "$tasks" } } }
      ]).toArray()
    },
    updateTask: function(db, userID, taskID, data) {
      return db.collection('users').update(
        { _id: userID,
        "tasks.task_id": taskID },
        { $set: {
          "tasks.$": data
        } }
      )
    },
    deleteTask: function(db, userID, taskID) {
      return db.collection('users').updateOne(
        { _id: userID },
        { $pull: { tasks: { task_id: taskID } } }
      )
    }
  }
}
