const dragStart = function(e){
    if(e.target.closest('.draggable')){
        e.target.closest('.draggable').classList.add('dragging');
    }
}
const dragEnd = function(e){
    if(e.target.closest('.draggable')){
        e.target.closest('.draggable').classList.remove('dragging');
    }
    saveTasks();
}
const dragOver = function(e){
    const tasksWrapper = e.target.closest('.tasks');
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    tasksWrapper.appendChild(dragging);
}

columnsContainer.addEventListener('dragstart', dragStart);
columnsContainer.addEventListener('dragend', dragEnd);
tasksWrappers.forEach((tasksWrapper) => {
    tasksWrapper.addEventListener('dragover', dragOver);
});