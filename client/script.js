const BASE_URL = 'https://todo-app-sonb.onrender.com/api/task';

const taskInput = document.getElementById('new-task-input');
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-task-input');
const saveEditBtn = document.getElementById('save-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

let editingTaskId = null;

// Fetch and render all tasks
async function fetchTasks() {
  const res = await fetch(BASE_URL);
  const tasks = await res.json();
  renderTasks(tasks);
}

// Render tasks in the UI
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const left = document.createElement('div');
    left.className = 'task-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', () => updateTask(task._id, { completed: checkbox.checked }));

    const span = document.createElement('span');
    span.textContent = task.task;
    span.className = task.completed ? 'task-text completed' : 'task-text';

    left.appendChild(checkbox);
    left.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'btn edit';
    editBtn.onclick = () => {
      editingTaskId = task._id;
      editInput.value = task.task;
      editModal.classList.remove('hidden');
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn delete';
    deleteBtn.onclick = () => deleteTask(task._id);

    li.appendChild(left);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Create a new task
addButton.addEventListener('click', async () => {
  const text = taskInput.value.trim();
  if (!text) return;

  await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: text })
  });

  taskInput.value = '';
  fetchTasks();
});

// Save edit
saveEditBtn.addEventListener('click', async () => {
  const newText = editInput.value.trim();
  if (!newText || !editingTaskId) return;

  await updateTask(editingTaskId, { task: newText });
  editingTaskId = null;
  editModal.classList.add('hidden');
  fetchTasks();
});

// Cancel edit
cancelEditBtn.addEventListener('click', () => {
  editingTaskId = null;
  editModal.classList.add('hidden');
});

// Update task (PUT)
async function updateTask(id, updates) {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  fetchTasks();
}

// Delete task
async function deleteTask(id) {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Load tasks on page load
fetchTasks();


