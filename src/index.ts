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
        title: input.value,
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
    // const trash = document.createElement("trash")
    const checkbox = document.createElement("input")
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        saveTasks()
    })
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    label.append(checkbox, task.title)
    item.append(label)
    // trash.append(trash)
    list?.append(item)
}

function deleteListItem (tasks: Task[], task: Task) {
    //change this --> add a trash icon on right side of each list item, if the trash icon is clicked (onClick) then we run the deleteListItem function which deletes that list item from localStorage and make sure it no longer appears on list
    for (let i = 0; i < tasks.length; i++) {
        if (task.completed) {
            localStorage.removeItem("TASKS")
        }
    }   
}

function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
    const taskJSON = localStorage.getItem("TASKS")
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
}
