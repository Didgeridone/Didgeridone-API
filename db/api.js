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
    updateTask: function(db, userID, taskID, data) {
      var set = {}
      set['tasks.'+taskID]= data;
      return db.collection('users').update(
        {_id: ObjectID(userID)},
        {$set: set}
      )
    },
    deleteTask: function(db, userID, data) {
      console.log('data.name', data.name)

      return db.collection('users').updateOne(
          {_id: ObjectID(userID)},
          {$pull: {tasks: {name: data.name}}}
        )
    }
  }
}
