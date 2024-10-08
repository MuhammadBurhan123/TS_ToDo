import {v4 as uuidV4} from "uuid";

// console.log(uuidV4())

type Task =  {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date,
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-input");

const tasks: Task[] = loadTasks();

tasks.forEach(addListItem)

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if(input?.value == "" || input?.value == null) return

  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  
  tasks.push(newTask)

  addListItem(newTask)
  input.value = ""
})

function addListItem(task : Task) : boolean {
  const item = document.createElement('li')
  const label =  document.createElement('label')
  const checkbox =  document.createElement('input')

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    saveTasks()
  })

  checkbox.type = 'checkbox'
  checkbox.checked = task.completed

  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)

  return true;
}

function saveTasks() : void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
  const taskJSON = localStorage.getItem('tasks')
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}