# Get Started

1. 'npm install' at the application root.

2. Type `mongo` in command line.

3. Type `use didgeridone`

4. Type `db.tasks.insert({ _id: 1, data: 'data!'});`

5. Replace line 15 in routes/api.js with `mongoose.connect('mongodb://localhost/didgeridone')`

6. Visit localhost:3000/api To ensure you see the data displayed as JSON.
