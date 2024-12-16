const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


let tasks = []; // Массив для хранения задач

app.use(express.json()); // Для обработки JSON в теле запроса

// Получить все задачи
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Добавить новую задачу
app.post('/tasks', (req, res) => {
  const newTask = req.body; // Получаем задачу из тела запроса
  tasks.push(newTask); // Добавляем в массив
  res.status(201).json(newTask); // Возвращаем добавленную задачу
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
