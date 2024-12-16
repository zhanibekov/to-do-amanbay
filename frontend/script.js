const apiUrl = 'http://localhost:3000/tasks'; // URL вашего API

// Функция загрузки задач
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Функция отображения задач
function displayTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Очистка текущего списка задач

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `${task.task}`;
    taskList.appendChild(taskElement);
  });
}

// Функция добавления задачи
async function addTask(taskText) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: taskText, // Поле должно совпадать с серверным
      }),
    });

    if (response.ok) {
      fetchTasks(); // Обновить список задач
    } else {
      console.error('Failed to add task');
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Обработчик кнопки Add Task
document.getElementById('taskForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Отключаем стандартное поведение формы
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTask(taskText); // Добавляем задачу через API
    taskInput.value = ''; // Очищаем поле ввода
  } else {
    console.warn('Task input is empty'); // Лог предупреждения
  }
});

// Загрузка задач при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchTasks);
