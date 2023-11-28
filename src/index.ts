import { v4 as uuidV4 } from 'uuid'

type Task = {
    id: string
    title: string
    completed: boolean
    createdAt: Date
}

const list = document.getElementById("list") as HTMLUListElement
const form = document.getElementById("new-task-form") as HTMLFormElement
const input = document.getElementById("new-task-title") as HTMLInputElement
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

document.addEventListener("DOMContentLoaded", () => {
    const dateDisplay = document.getElementById("date") as HTMLElement;

    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);

    dateDisplay.textContent = `${formattedDate}`;
});

form?.addEventListener("submit", e => {{
    e.preventDefault()

    // deleteListItem(tasks, task);

    if (input?.value == "" || input?.value == null) return 

    const newTask: Task = {
        id: uuidV4(),
        title: input.value.trim(),
        completed: false,
        createdAt: new Date()
    }

    tasks.push(newTask)

    addListItem(newTask) 
    input.value = ""
}})

function addListItem(task: Task) {
    const item = document.createElement("li")
    const label = document.createElement("label")
    const trash = document.createElement("span");
    const checkbox = document.createElement("input")
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        checkbox.style.accentColor = 'black'
        saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.style.cursor = 'pointer';
    checkbox.checked = task.completed
    trash.innerHTML = '&#128465';
    trash.style.cursor = 'pointer';

    trash.addEventListener("click", () => {
        deleteListItem(task);
        item.remove();
    });

    label.append(checkbox, task.title, trash)
    item.append(label)
    list?.append(item)
}

function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS")
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
}
