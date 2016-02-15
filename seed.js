db.users.insert({
  first_name: 'Derik',
  last_name: 'Linch',
  email: 'dlinch33@gmail.com',
  password: 'password1',
  tasks: [
    {
    name: 'Do dishes',
    lat: 'lat',
    long: 'long',
    radius: 15,
    done: false,
    enter: true
  },
  {
    name: 'Pet the dog',
    lat: 'lat',
    long: 'long',
    radius: 10,
    done: false,
    enter: false
  }
  ]
  })

  db.users.insert({
    first_name: 'Adam',
    last_name: 'Oken',
    email: 'dlinch33@gmail.com',
    password: 'password1',
    tasks: [
      {
      name: 'Angularize it',
      lat: 'lat',
      long: 'long',
      radius: 15,
      done: false,
      enter: true
    },
    {
      name: 'Call the gf',
      lat: 'lat',
      long: 'long',
      radius: 10,
      done: false,
      enter: false
    }
    ]
    })

    db.users.insert({
      first_name: 'David',
      last_name: 'Adams',
      email: 'dlinch33@gmail.com',
      password: 'password1',
      tasks: [
        {
        name: 'Get the api working',
        lat: 'lat',
        long: 'long',
        radius: 15,
        done: false,
        enter: true
      },
      {
        name: 'Call the gf',
        lat: 'lat',
        long: 'long',
        radius: 10,
        done: true,
        enter: true
      }
      ]
      })
