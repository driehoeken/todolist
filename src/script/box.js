const transparent = document.querySelector('.transparent-black');
const box = document.querySelector('.box');
const boxClose = document.querySelector('.box-close');
const inputName = document.querySelector('#input-name');
const inputColor = document.querySelector('#input-color');
const inputDesc = document.querySelector('#input-desc');
const inputDate = document.querySelector('#input-date');
const inputStatus = document.querySelector('#status');
const boxConfirm = document.querySelector('.box-confirm');
const boxError = document.querySelector('#box-error');

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

        //converting date from dd.mm.yyyy to yyyy-mm-dd so we can set calendar input
        let date = editedTask.date.split('.');
        date = `20${date[2]}-${date[1]}-${date[0]}`;
        inputDate.value = date;
        inputStatus.value = editedStatus;
    }
}

const hideBox = function(){
    body.classList.remove('overflow-hidden');
    transparent.classList = 'transparent-black off';
    //setting values to basic
    boxConfirm.textContent = 'Add task';
    document.querySelector('.box-header').textContent = 'Add task';

    inputName.value = '';
    inputColor.value = '#000000';
    inputDesc.value = '';
    inputDate.value = '';
    
    inputStatus.value = 'toDo';
    box.classList = 'box off';

}

boxConfirm.addEventListener('click', () => {

    //converting date from yyyy-mm-dd to dd.mm.yyyy so we can set calendar input
    let date = inputDate.value.split('-');
    date = `${date[2]}.${date[1]}.${date[0].slice(-2)}`;

    //if date is not defined
    if(inputDate.value === ''){
        date = '';
    }
    //if name is not defined
    if(inputName.value === ''){
        boxError.textContent = 'Set name of your task!';
        return;
    }
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
        //if status has changed, it will push task to the new array and remove from the old one
        if(editedStatus !== inputStatus.value){
            tasks[inputStatus.value].push(taskToEdit);
            tasks[editedStatus].splice(tasks[editedStatus].indexOf(taskToEdit), 1);
        }
        renderTask(editedStatus, editedId);
    }
    boxError.textContent = '';
    hideBox();
});

transparent.addEventListener('click', hideBox);
boxClose.addEventListener('click', hideBox);