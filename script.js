const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter(){
    const remaining = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${remaining} Tasks Remaining`;
}

function renderTasks(){
    taskList.innerHTML = "";

    tasks.forEach((task,index)=>{
        const li = document.createElement("li");

        li.innerHTML = `
        <div class="task-info ${task.completed ? 'completed' : ''}">
            ${task.text}
            <br>
            <small>Due: ${task.date || "No Date"}</small>
        </div>

        <button class="delete-btn" onclick="deleteTask(${index})">
            Delete
        </button>
        `;

        li.querySelector(".task-info").onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask(){
    if(taskInput.value.trim() === "") return;

    tasks.push({
        text: taskInput.value,
        date: dueDate.value,
        completed:false
    });

    taskInput.value="";
    dueDate.value="";

    saveTasks();
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    renderTasks();
}

function clearAllTasks(){
    tasks=[];
    saveTasks();
    renderTasks();
}

searchInput.addEventListener("keyup", ()=>{
    const filter = searchInput.value.toLowerCase();

    document.querySelectorAll("li").forEach(li=>{
        li.style.display =
            li.textContent.toLowerCase().includes(filter)
            ? ""
            : "none";
    });
});

document.getElementById("themeBtn").addEventListener("click", ()=>{
    document.body.classList.toggle("light-mode");
});

renderTasks();