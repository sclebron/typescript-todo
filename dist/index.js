import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.getElementById("list");
const form = document.getElementById("new-task-form");
const input = document.getElementById("new-task-title");
const tasks = loadTasks();
tasks.forEach(addListItem);
document.addEventListener("DOMContentLoaded", () => {
  const dateDisplay = document.getElementById("date");
  const today = new Date();
  const options = {year: "numeric", month: "long", day: "numeric"};
  const formattedDate = today.toLocaleDateString(void 0, options);
  dateDisplay.textContent = `${formattedDate}`;
});
form?.addEventListener("submit", (e) => {
  {
    e.preventDefault();
    if (input?.value == "" || input?.value == null)
      return;
    const newTask = {
      id: uuidV4(),
      title: input.value.trim(),
      completed: false,
      createdAt: new Date()
    };
    tasks.push(newTask);
    addListItem(newTask);
    input.value = "";
  }
});
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const trash = document.createElement("span");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    checkbox.style.accentColor = "black";
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title, trash);
  item.append(label);
  list?.append(item);
}
function deleteListItem(tasks2, task) {
}
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  return JSON.parse(taskJSON);
}
