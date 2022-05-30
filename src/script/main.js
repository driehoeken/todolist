let tasks = {
    toDo:[
        {
            name:'bsfdbfdsbf',
            color:'#015312',
            desc:'hahahahahha',
            date:'15.07.22',
        },
        {
            name:'34erfgdfg',
            color:'#015312',
            desc:'hahahahahha',
            date:'15.07.22',
        }
    ],
    doing:[
        {
            name:'#@Q3tgdsg',
            color:'#078912',
            desc:'hah3rrf3ahha',
            date:'17.07.22',
        }
    ],
    done:[

    ]
};

const addTasks = document.querySelectorAll('.add-task');
const body = document.querySelector('body');
const columnsContainer = document.querySelector('#columns-container');
const tasksWrappers = document.querySelectorAll('.tasks');

const statuses = ['toDo', 'doing', 'done'];

let editedId, editedStatus;

const addTask = function(name, color, desc, date, status){
    const task = {
        name: name,
        color: color,
        desc: desc,
        date: date,
    }
    tasks[status].push(task);
    renderTasks();
}
const renderTasks = function(){
    //removing all tasks from DOM
    const tasksToDel = document.querySelectorAll('.task');
    tasksToDel.forEach((task)=>{
        task.remove();
    });
    //rendering tasks
    statuses.forEach((status) => {
        tasks[status].forEach((task) => {
            renderTask(status, tasks[status].indexOf(task));
        });
    });
    //saving tasks in localStorage every time they are rendered
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getTask = function(e){
    //getting id and status of clicked task
    const task = e.target.closest('.task');
    const tasks = e.target.closest('.tasks');

    return {id: [...tasks.children].indexOf(task), status: tasks.id};
}

const removeTask = function(e){
    if(e.target.closest('.task-remove')){
        const task = getTask(e);
        tasks[task.status].splice(task.id, 1);
        renderTasks();
    }
}

const editTask = function(e){
    if(e.target.closest('.task-edit')){
        const task = getTask(e);

        //setting editedId and editetStatus to load tasks' values in box
        editedId = task.id;
        editedStatus = task.status;
        showBox(true);
    }
}

const renderTask = function(status, index){
    const tasksDivs = [...document.getElementById(status).children];
    const searchedTask = tasksDivs[index];
    const task = tasks[status][index];

    const taskInner = `
        <div class='task-top'>
        <p class="task-title">${task.name}</p>
        <button class="task-edit"><i class="fa-solid fa-pen"></i></button>
        <button class="task-remove"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="task-color" style="background-color: ${task.color};"></div>
        <div class="task-bottom">
        <p class="task-desc">${task.desc}</p>
        <p class="task-date">${task.date}</p>`;
    //if task at this index exist it will change only innerHTML
    if(searchedTask !== undefined){
        searchedTask.innerHTML = taskInner;
    }
    //otherwise it will create new div
    else{
        const newTask = document.createElement('div');
        newTask.classList = ('task draggable');
        newTask.setAttribute('draggable', 'true');
        newTask.innerHTML = taskInner;
        document.getElementById(status).appendChild(newTask);
    }
};

addTasks.forEach((button) => {
    button.addEventListener('click', (e) => {
        //setting status value in box when clicked addTask btn in column
        if(e.target.classList.contains('column-add-task') || e.target.closest('.column-top-add-task')){
            inputStatus.value = e.target.closest('.column').querySelector('.tasks').id;
        }
        showBox(false);
    });
});
columnsContainer.addEventListener('click', editTask);
columnsContainer.addEventListener('click', removeTask);


const saveTasks = function(){
    let tasksEmpty = {
        toDo:[

        ],
        doing:[

        ],
        done:[
    
        ]
    };
    tasksWrappers.forEach((taskWrapper) => {
        const taskDivs = [...document.getElementById(taskWrapper.id).children];
        taskDivs.forEach((taskDiv) => {
            const task = {
                name: taskDiv.querySelector('.task-title').textContent,
                color: taskDiv.querySelector('.task-color').getAttribute('style').replace('background-color: ', '').replace(';', ''),
                desc: taskDiv.querySelector('.task-desc').textContent,
                date: taskDiv.querySelector('.task-date').textContent
            }
            tasksEmpty[taskWrapper.id].push(task);
        });
        tasks = tasksEmpty;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



//loading tasks from local localStorage if they exist
if(localStorage.getItem('tasks') !== null){
    tasks = JSON.parse(localStorage.getItem('tasks'));
}


renderTasks();