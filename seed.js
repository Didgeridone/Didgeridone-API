db.users.insert({
  first_name: 'Derik',
  last_name: 'Linch',
  email: 'dlinch33@gmail.com',
  oauthID: 1234,
  tasks: [
    {
    name: 'Do dishes',
    lat: 'lat',
    long: 'long',
    radius: 15,
    done: false,
    enter: true,
    task_id: ObjectId()
  },
  {
    name: 'Pet the dog',
    lat: 'lat',
    long: 'long',
    radius: 10,
    done: false,
    enter: false,
    task_id: ObjectId()
  }
  ]
  })

  db.users.insert({
    first_name: 'Adam',
    last_name: 'Oken',
    email: 'okemo93@aol.com',
    oauthID: 1234,
    tasks: [
      {
      name: 'Angularize it',
      lat: 'lat',
      long: 'long',
      radius: 15,
      done: false,
      enter: true,
      task_id: ObjectId()
    },
    {
      name: 'Call the gf',
      lat: 'lat',
      long: 'long',
      radius: 10,
      done: false,
      enter: false,
      task_id: ObjectId()
    }
    ]
    })

    db.users.insert({
      first_name: 'David',
      last_name: 'Adams',
      email: 'adams@rockstar.com',
      oauthID: 1234,
      tasks: [
        {
        name: 'Get the api working',
        lat: 'lat',
        long: 'long',
        radius: 15,
        done: false,
        enter: true,
        task_id: ObjectId()
      },
      {
        name: 'Call the gf',
        lat: 'lat',
        long: 'long',
        radius: 10,
        done: false,
        enter: true,
        task_id: ObjectId()
      },
      {
        name: 'Shave my lady beard',
        lat: 'lat',
        long: 'long',
        radius: 10,
        done: false,
        enter: true,
        task_id: ObjectId()
      },
      {
        name: 'Learn karate',
        lat: 'lat',
        long: 'long',
        radius: 10,
        done: false,
        enter: true,
        task_id: ObjectId()
      },
      {
        name: 'Beat Josh in a pushup contest',
        lat: 'lat',
        long: 'long',
        radius: 10,
        done: false,
        enter: true,
        task_id: ObjectId()
      },

      ]
      })
