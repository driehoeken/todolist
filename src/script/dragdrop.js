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
    //tasksWrapper.appendChild(dragging);
    const rect = tasksWrapper.getBoundingClientRect();
    const lengthFromTop = e.clientY - rect.y;
    //const dragIndex = Math.floor((lengthFromTop + 40) / 90);
    const tasks = [...tasksWrapper.children];
    let totalHeight = 0;
    let afterTask;
    for(const task of tasks){
        //height + border(2 * 2px) + margin(10px)
        const taskHeight = task.clientHeight + 14;
        totalHeight += taskHeight;
        if(totalHeight > lengthFromTop){
            //top part of task
            if((totalHeight - lengthFromTop) > taskHeight / 2){
                afterTask = tasks[tasks.indexOf(task)];
                console.log('top')
            }
            //bottom part of task
            else{
                afterTask = tasks[tasks.indexOf(task) + 1];
                console.log('bottom');
            }
            break;
        }
    }
    tasksWrapper.insertBefore(dragging, afterTask);
}

columnsContainer.addEventListener('dragstart', dragStart);
columnsContainer.addEventListener('dragend', dragEnd);
tasksWrappers.forEach((tasksWrapper) => {
    tasksWrapper.addEventListener('dragover', dragOver);
});