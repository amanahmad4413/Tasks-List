// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load All Event Listeners
loadEventListeners();

// DOM Load Events
document.addEventListener("DOMContentLoaded", getTasks);

// Load All Event Listeners
function loadEventListeners() {
  // Add Task Events
  form.addEventListener("submit", addTask);
  // Remove Task Events
  taskList.addEventListener("click", removeTask);
  // Clear Task events
  clearBtn.addEventListener("click", clearTasks);
  // Filter Tasks events
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks From Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Creating Li Elements
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create text node and apppend to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add Class
    link.className = "delete-item secondary-content";
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  // Creating Li Elements
  const li = document.createElement("li");
  // Add Class
  li.className = "collection-item";
  // Create text node and apppend to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add Class
  link.className = "delete-item secondary-content";
  // Add icon HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear inputs
  taskInput.value = "";

  console.log(li);
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove From Local Storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Tasks From Local Storage
  clearTasksFromLocalStorage();
}

// Clear Task From LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
