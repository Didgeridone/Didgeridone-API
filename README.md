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
#### POST -> /task/[user_id]
#### PUT -> /task/[user_id]/[task_id]
#### DELETE -> /task/[user_id]/[task_id]

## Users
#### GET -> /user/[user_id]
#### PUT -> /user/[user_id]
#### DELETE -> /user/[user_id]

## Authentication
#### GET -> /auth/google
#### GET -> /auth/gogole/callback
