"use strict"
// Warning element: If the list is empty i'll be shown

// <li class="li-task-warning" id="li-warning" >You don't have any tasks! </li>
let warningMessage = "You don't have any tasks";
const liWarning = document.createElement('li');
liWarning.classList.add('li-task-warning');
liWarning.innerText = warningMessage;
liWarning.setAttribute('id', 'li-warning');

document.addEventListener('DOMContentLoaded', function(){

// DOM elements
const mainForm = document.querySelector('.form');
const mainInput = document.querySelector('input');
const mainButton = document.querySelector('[type="submit"]');
const ulTaskContainer = document.querySelector('.list-container');

/////////////FUNCTIONS ///////////////////

// each time something changes the function will be executed
function checkTasks(){
    let numTasks = document.getElementsByClassName('li-task').length;
    //if there are no tasks then the liWarning will be appended
    if(numTasks === 0){
        ulTaskContainer.appendChild(liWarning);
    }else if(document.getElementById('li-warning')){
        liWarning.remove();
        // if there is a liWarning element it'll be removed
    }
}
// cretae new li task  function
function addNewTask(taskName){
    const liTask = document.createElement('li');
    liTask.classList.add('li-task');
    liTask.innerHTML = ` 
    <p class="li-task-name">${taskName}</p>
    <div class="li-button-container">
    <button class="edit-button"></button>
    <button class="delete-button"></button>
    </div>
    `
    ulTaskContainer.prepend(liTask);
    setTimeout(()=> {
        liTask.classList.add('li-task-show')
    }, 0);

    checkTasks();
}
//////////////EVENTS ///////////////

// Remove form's default behavior
mainForm.addEventListener('submit', function(e){
    e.preventDefault();
    e.target.reset();
});
// Event bubbling to catch the event in the form element instead of using one for the button itself
mainForm.addEventListener('click', function(e){
    if(e.target === mainButton){
        if(mainInput.value){
            addNewTask(mainInput.value);
        }
    }
});
// Event bubbling to catch the event in the ulTaskContainer (ul). To avoid creating a listener to each task and button
ulTaskContainer.addEventListener('click', function(e){
    // Identify the trigger of the event:
    if(e.target.classList.contains('delete-button')){
        // console.log(`Delete element`);
        e.target.closest('.li-task').remove();
        checkTasks();
    }else if(e.target.classList.contains('edit-button')){
        // console.log(`Edit element`)
        let liTask = e.target.closest('.li-task');
        liTask.firstElementChild.setAttribute('contentEditable', 'true');
        checkTasks();
    }
});

checkTasks();
});//DOMContentLoaded

