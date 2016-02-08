# Get Started

1. Type `mongo` in command line.

2. Type `use didgeridone`

3. Type `db.tasks.insert({ _id: 1, data: 'data!'});`

4. Replace line 15 in routes/api.js with `mongoose.connect('mongodb://localhost/didgeridone')`

5. Visit localhost:3000/api To ensure you see the data displayed as JSON.
