const express = require('express');
const app = express();
const port = 3000;
app.use(cors());


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.get('/tasks', (req, res) => {
    const tasks = [
        {id: 1, task: 'Learn JavaScrpit'},
        {id: 2, task: 'Build Backend'},
        {id: 3, task: 'Create to-do app'}
    ];
    res.json(tasks);
})
// app.use(cors({ origin: 'http://localhost:3001' })); // Укажите порт вашего фронтенда


app.post('/tasks', (req, res) => {
    const newTask = req.body;
    if(!newTask || !newTask.task) {
        return res.status(400).json({error: 'Task description is required'});
    }
    newTask.id = Date.now();
    res.status(201).json(newTask);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });