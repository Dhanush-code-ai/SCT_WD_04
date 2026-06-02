let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask(){

    const taskName =
    document.getElementById("taskName").value;

    const category =
    document.getElementById("category").value;

    const date =
    document.getElementById("taskDate").value;

    if(taskName.trim()===""){
        alert("Enter a task");
        return;
    }

    tasks.push({
        name:taskName,
        category:category,
        date:date,
        completed:false
    });

    saveTasks();
    location.reload();
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();
    location.reload();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    location.reload();
}

function renderDashboard(){

    const list =
    document.getElementById("taskList");

    if(!list) return;

    tasks.forEach((task,index)=>{

        list.innerHTML += `
        <div class="task ${task.completed ? 'completed':''}">
            <h3>${task.name}</h3>
            <p>${task.category}</p>
            <p>${task.date}</p>

            <button onclick="toggleTask(${index})">
            ${task.completed ? 'Undo':'Complete'}
            </button>

            <button onclick="deleteTask(${index})">
            Delete
            </button>
        </div>
        `;
    });
}

function renderCompleted(){

    const box =
    document.getElementById("completedTasks");

    if(!box) return;

    tasks
    .filter(task=>task.completed)
    .forEach(task=>{

        box.innerHTML += `
        <div class="task completed">
            <h3>${task.name}</h3>
            <p>${task.category}</p>
            <p>${task.date}</p>
        </div>
        `;
    });
}

function renderIncomplete(){

    const box =
    document.getElementById("incompleteTasks");

    if(!box) return;

    tasks
    .filter(task=>!task.completed)
    .forEach(task=>{

        box.innerHTML += `
        <div class="task">
            <h3>${task.name}</h3>
            <p>${task.category}</p>
            <p>${task.date}</p>
        </div>
        `;
    });
}

renderDashboard();
renderCompleted();
renderIncomplete();