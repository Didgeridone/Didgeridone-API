# Get Started

1. 'npm install' at the application root.

2. Type `mongo` in command line.

3. Type `use didgeridone`

4. Type `db.tasks.insert({ _id: 1, data: 'data!'});`

5. Replace line 15 in routes/api.js with `mongoose.connect('mongodb://localhost/didgeridone')`

6. Visit localhost:3000 To ensure you see the data displayed as JSON.

# API Documentation
## Below is a list of all of the API calls that are supported
##### Note that this API is meant to work with only the Didgeridone App, so you must be authenticated as a user to use any of these API calls.
## Root URL
[https://didgeridone.herokuapp.com/](https://didgeridone.herokuapp.com/)

## Tasks
#### GET -> /task/[user_id]
* This call returns all of the tasks for a user
* Format:
```json
{
  "user": {
    "_id": "56c3ad2db2233e8c7c9d3612",
    "tasks": [
      {
        "name": "Do Laundry when I get home",
        "lat": "39.529879",
        "long": "-103.952969",
        "radius": 15,
        "done": false,
        "enter": true,
        "task_id": "56c3ad2db2d73e8c7c9d360d"
      },
      {
        "name": "Remember to call my mom when I get to work",
        "lat": "39.7637916",
        "long": "-105.0122439",
        "radius": 10,
        "done": false,
        "enter": true,
        "task_id": "56c3ad2db227de8c7c9d360e"
      }
    ]
  }
}
```

#### POST -> /task/[user_id]
* This call will create a task for a user
* The request must contain JSON data formatted like below
* Format:
```json

```

#### PUT -> /task/[user_id]/[task_id]
#### DELETE -> /task/[user_id]/[task_id]

## Users
#### GET -> /user/[user_id]
#### PUT -> /user/[user_id]
#### DELETE -> /user/[user_id]

## Authentication
#### GET -> /auth/google
#### GET -> /auth/google/callback
