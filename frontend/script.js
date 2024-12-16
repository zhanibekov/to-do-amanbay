// API URL
const apiUrl = 'http://localhost:3000/tasks';

// Fetch tasks from the backend
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    displayTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Display tasks on the page
function displayTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Clear existing tasks
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <p>${task.text}</p>
    `;
    taskList.appendChild(taskElement);
  });
}

// Add a new task to the backend
async function addTask(taskText) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: taskText,
        id: Date.now(), // Use current timestamp as task ID
      }),
    });

    if (response.ok) {
      fetchTasks(); // Reload tasks after adding
    } else {
      console.error('Failed to add task');
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Handle add task button click
document.getElementById('addTaskButton').addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    taskInput.value = ''; // Clear input field
  }
});

// Initial load of tasks
fetchTasks();
