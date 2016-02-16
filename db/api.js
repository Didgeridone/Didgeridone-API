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
      return db.collection('users').deleteOne( { "_id": userID } )
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
      var set = {}
      taskID -= 1
      set['tasks.' + taskID] = data;
      return db.collection('users').update(
        { _id: userID },
        { $set: set }
      )
    },
    deleteTask: function(db, userID, taskID) {
      return db.collection('users').updateOne(
        { _id: userID },
        { $pull: { tasks: { task_id: parseInt(taskID) } } }
      )
    }
  }
}
