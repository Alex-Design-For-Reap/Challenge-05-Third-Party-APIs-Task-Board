

// Declaring variables to be used later*****

let formEl = $('#create-task-form');
let taskTitleInputEl = $('#task-title');
let taskDueDateInputEl = $('#task-due-date');
let taskDescriptionInputEl = $('#task-description');
let toDoTasksEl = $('#todo-cards');
let inProgressTasksEl = $('#in-progress-cards');
let doneTasksEl = $('#done-cards');

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000000);
}

// Todo: create a function to create a task card and render the task list
const renderTasks = function(taskList) {
  // Clear existing tasks
  toDoTasksEl.empty();

  // Iterate over each task in the list and create task cards
  taskList.forEach(function(taskData) {
    const taskCard = $('<div>').addClass('task-card');
    const taskCardTitle = $('<h3>').text(taskData.title);
    const taskCardDescription = $('<p>').text(taskData.description);
    const taskCardDueDate = $('<p>').text('Due date: ' + taskData.dueDate);
    const taskCardDeleteBtn = $('<button>').text('Delete').addClass('delete-btn');

     // Determine the due date status using Day.js
  const dueDate = dayjs(taskData.dueDate);
  const currentDate = dayjs();
  if (dueDate.isBefore(currentDate, 'day')) {
    taskCard.addClass('past-due');
  } else if (dueDate.diff(currentDate, 'day') <= 7) {
    taskCard.addClass('due-soon');
  }

    taskCardDeleteBtn.on('click', function(event) {
      handleDeleteTask(event, taskList);
    });

    taskCard.append(taskCardTitle, taskCardDescription, taskCardDueDate, taskCardDeleteBtn);
    toDoTasksEl.append(taskCard);
  });
};

// Todo: create a function to handle adding a new task
const handleAddTask = function(event) {
  event.preventDefault();

  const taskTitle = taskTitleInputEl.val();
  const taskDueDate = taskDueDateInputEl.val();
  const taskDescription = taskDescriptionInputEl.val();

  // Check if the form is empty
  if (!taskTitle || !taskDueDate || !taskDescription) {
    console.log('You need to add info to all fields!');
    return;
  }

  // Get existing tasks from localStorage or initialize an empty array
  let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

  // Create a new task object
  const taskData = {
    taskId: generateTaskId(),
    title: taskTitle,
    dueDate: taskDueDate,
    description: taskDescription
  };

  // Add the new task to the list
  taskList.push(taskData);

  // Save the updated task list to localStorage
  localStorage.setItem('taskList', JSON.stringify(taskList));

  // Render the tasks
  renderTasks(taskList);

  // Clean form fields and hide modal
  taskTitleInputEl.val('');
  taskDueDateInputEl.val('');
  taskDescriptionInputEl.val('');
  $('#card-task-modal').modal('hide');
};

// Call the renderTasks function when the page loads
$(document).ready(function() {
  let taskList = JSON.parse(localStorage.getItem('taskList')) || [];
  renderTasks(taskList);

  // Set up add task handler
  formEl.on('submit', handleAddTask);
});  



// Todo: create a function to handle deleting a task
function handleDeleteTask(event, taskList) {
  const taskId = $(event.target).closest('.task-card').attr('id');
  const updateTaskList = taskList.filter(task => task.taskId !== taskId);
  localStorage.setItem('taskList', JSON.stringify(updateTaskList));
  $(event.target).closest('.task-card').remove();
}


// Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

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

// Datepicker widget for modal**************
$(function () {
  $('#task-due-date').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});

