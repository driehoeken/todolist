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
const boxConfirm = document.querySelector('.box-confirm');
const body = document.querySelector('body');
const transparent = document.querySelector('.transparent-black');
const box = document.querySelector('.box');
const boxClose = document.querySelector('.box-close');
const inputName = document.querySelector('#input-name');
const inputColor = document.querySelector('#input-color');
const inputDesc = document.querySelector('#input-desc');
const inputDate = document.querySelector('#input-date');
const inputStatus = document.querySelector('#status');
const columnsContainer = document.querySelector('#columns-container');

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
            let taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.innerHTML = `
            <div class='task-top'>
                <p class="task-title">${task.name}</p>
                <button class="task-edit"><i class="fa-solid fa-pen"></i></button>
                <button class="task-remove"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="task-color" style="background-color: ${task.color};"></div>
            <div class="task-bottom">
                <p class="task-desc">${task.desc}</p>
                <p class="task-date">${task.date}</p>`;
            document.querySelector(`#${status}`).appendChild(taskDiv);
        });
    });
}

const showBox = function(isEdit){
    body.classList.add('overflow-hidden');
    transparent.classList = 'transparent-black on';
    box.classList = isEdit ? 'box on edit' : 'box on';
    //if the box is used to edit a task it will be filled with values of task which user is editing
    if(isEdit){
        const editedTask = tasks[editedStatus][editedId];
        boxConfirm.textContent = 'Edit task';
        document.querySelector('.box-header').textContent = 'Edit task';

        inputName.value = editedTask.name;
        inputColor.value = editedTask.color;
        inputDesc.value = editedTask.desc;

        let date = editedTask.date.split('.');
        date = `20${date[2]}-${date[1]}-${date[0]}`;
        inputDate.value = date;
        inputStatus.value = editedStatus;
    }
}

const hideBox = function(){
    body.classList.remove('overflow-hidden');
    transparent.classList = 'transparent-black off';
    //if box was used to edit a task its values will be set to basic
    if(box.classList.contains('edit')){
        boxConfirm.textContent = 'Add task';
        document.querySelector('.box-header').textContent = 'Add task';

        inputName.value = '';
        inputColor.value = '#000000';
        inputDesc.value = '';
        inputDate.value = '';
    }
    inputStatus.value = 'toDo';
    box.classList = 'box off';

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
        editedId = task.id;
        editedStatus = task.status;
        showBox(true);
    }
}

addTasks.forEach((button) => {
    button.addEventListener('click', (e) => {
        //setting status value in box when clicked addTask btn in column
        if(e.target.classList.contains('column-add-task') || e.target.closest('.column-top-add-task')){
            inputStatus.value = e.target.closest('.column').querySelector('.tasks').id;
        }
        showBox(false);
    });
});

transparent.addEventListener('click', hideBox);
boxClose.addEventListener('click', hideBox);
boxConfirm.addEventListener('click', () => {
    let date = inputDate.value.split('-');
    date = `${date[2]}.${date[1]}.${date[0].slice(-2)}`;
    //if box is not used to edit, new task will be added
    if(!box.classList.contains('edit')){
        addTask(inputName.value, inputColor.value, inputDesc.value, date, inputStatus.value);
    }
    else{
        //getting task which is edited and changing its values
        let taskToEdit = tasks[editedStatus][editedId];
        taskToEdit.name = inputName.value;
        taskToEdit.color = inputColor.value;
        taskToEdit.desc = inputDesc.value;
        taskToEdit.date = date;
        //if status has changed, it will push task to the new list and remove from the old one
        if(editedStatus !== inputStatus.value){
            tasks[inputStatus.value].push(taskToEdit);
            tasks[editedStatus].splice(tasks[editedStatus].indexOf(taskToEdit), 1);
        }
        renderTasks();
    }
    hideBox();
});

columnsContainer.addEventListener('click', editTask);
columnsContainer.addEventListener('click', removeTask);

renderTasks();