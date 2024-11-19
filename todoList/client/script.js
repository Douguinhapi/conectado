const apiUrl = 'http://localhost:3000/tasks';

async function getTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    displayTasks(tasks);
}

async function addTask(title) {
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
    getTasks();
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpa a lista antes de renderizar
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        taskList.appendChild(li);
    });
}

document.getElementById('addTaskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskTitle = document.getElementById('taskTitle').value;
    addTask(taskTitle);
    document.getElementById('taskTitle').value = ''; // Limpa o campo
});

getTasks();