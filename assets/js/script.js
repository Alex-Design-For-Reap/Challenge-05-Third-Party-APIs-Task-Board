//Function to enable auto focus: https://getbootstrap.com/docs/5.3/components/modal/
// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', () => {
//   myInput.focus()
// })

// Datepicker widget for modal**************
$(function () {
  $('#task-due-date').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

// Declaring variables to be used later*****

let formEl = $('#create-task-form');
let taskTitleInputEl = $('#task-title');
let taskDueDateInputEl = $('#task-due-date');
let taskDescriptionInputEl = $('#task-description');
let toDoTasksEl = $('#todo-cards');
let inProgressTasksEl = $('#in-progress-cards');
let doneTasksEl = $('#done-cards');



// adding alert for empty fields plus function 

const handleFormSubmit = function (event) {
  event.preventDefault();

  //getting existing tasks from local storage to be added to page
  // Retrieve tasks and nextId from localStorage
  let taskList = JSON.parse(localStorage.getItem("taskList"));
  if(taskList == null) taskList = [];
  // let nextId = JSON.parse(localStorage.getItem("nextId"));

  const taskTitle = taskTitleInputEl.val();
  const taskDueDate = taskDueDateInputEl.val();
  const taskDescription = taskDescriptionInputEl.val();

  //creating a JavaScript object
  let taskData = {
  title: taskTitle,
  dueDate: taskDueDate,
  description: taskDescription
  };

  //Checking if the form is empty and adding data to localStorage
  if (!taskTitle || !taskDueDate || !taskDescription) {
    console.log('You need to add info to all fields!');
    return;
  } else {
    // this.submit();
    localStorage.setItem(`taskData`, JSON.stringify(taskData));
    taskList.push(taskData);
    localStorage.setItem(`taskList`, JSON.stringify(taskList));
  };

  let taskListStorage = JSON.parse(localStorage.getItem('taskList')) || [];
  // toDoTasksEl.innerHTML = ``;

  taskListStorage.forEach(function(taskData, index){

    const createTaskCard = function (title, date, description) {
      const taskCard = $('<div>').addClass('task-card');
      const taskCardTitle = $('<h3>').text(taskData.title);
      const taskCardDescription = $('<p>').text(taskData.description);
      const taskCardDueDate = $('<p>').text('Due date: ' + taskData.dueDate);
      const taskCardDeleteBtn = $('<button>').text('Delete').addClass('delete-btn');
      toDoTasksEl.append(taskCard);
      taskCard.append(taskCardTitle, taskCardDescription, taskCardDueDate, taskCardDeleteBtn);
      return taskCard;
    };

    createTaskCard(taskTitle, taskDueDate, taskDescription);
    
  });

  //cleaning form fields and hiding modal after clicking 'add task'
  taskTitleInputEl.val('');
  taskDueDateInputEl.val('');
  taskDescriptionInputEl.val('');

  $('#card-task-modal').modal('hide');
};

formEl.on('submit', handleFormSubmit);  
  


// new function*******

$(document).ready(function() {
  // Make tasks sortable within each swim lane
  $('.sortable-list').sortable({
    connectWith: '.sortable-list',
    placeholder: 'task-placeholder',
    update: function(event, ui) {
      // Handle task movement here (e.g., update task status)
    }
  }).disableSelection();
});



// Todo: create a function to generate a unique task id
// function generateTaskId() {

// }

// Todo: create a function to create a task card
// function createTaskCard(task) {

// }

// Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {

// }

// Todo: create a function to handle adding a new task
// function handleAddTask(event){

// }

// Todo: create a function to handle deleting a task
// function handleDeleteTask(event){

// }

// Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {


// });

