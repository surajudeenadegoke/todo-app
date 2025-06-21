const taskInput = document.getElementById("new-task-input");
const addButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

const editModal = document.getElementById("edit-modal");
const editInput = document.getElementById("edit-task-input");
const saveEditBtn = document.getElementById("save-edit");
const cancelEditBtn = document.getElementById("cancel-edit");

let editingTaskId = null;
const BASE_URL = `http://localhost:3000/api/task`;

async function fetchTasks() {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  renderTasks(data);
}

const renderTasks = (tasks)=> {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const leftDiv = document.createElement("div");
    leftDiv.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "task-checkbox";
    checkbox.addEventListener("change", async () => {
      await updateTask(task._id, { completed: checkbox.checked });
      fetchTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.task;
    span.className = task.completed ? "task-text completed" : "task-text";

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "btn edit";
    editBtn.onclick = () => {
      editingTaskId = task._id;
      editInput.value = task.text;
      editModal.classList.remove("hidden");
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn delete";
    deleteBtn.onclick = async () => {
      await deleteTask(task._id);
      fetchTasks();
    };

    li.appendChild(leftDiv);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addButton.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (text) {
    await createTask({ text });
    taskInput.value = "";
    fetchTasks();
  }
});

saveEditBtn.addEventListener("click", async () => {
  const newText = editInput.value.trim();
  if (newText) {
    await updateTask(editingTaskId, { text: newText });
    editingTaskId = null;
    editModal.classList.add("hidden");
    fetchTasks();
  }
});

cancelEditBtn.addEventListener("click", () => {
  editingTaskId = null;
  editModal.classList.add("hidden");
});

// ========== API CALLS ==========

async function createTask(task) {
  await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

async function updateTask(id, updates) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
}

async function deleteTask(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

// Load tasks on page load
fetchTasks();
