import { addProject } from "./project-logic.js";
import { addTodo } from "./todos-logic.js";
import { projects } from "./project-logic.js";

const projectsContainer = document.getElementById('projectsContainer');
const todosContainer = document.getElementById('todosContainer');

const addProjectDOM = document.getElementById('addProject');
const addProjectPopup = document.getElementById('addProjectPopup');
const saveButtonProject = document.getElementById('saveButtonProject');
const cancelButtonProject = document.getElementById('cancelButtonProject');

const addTodoDOM = document.getElementById('addTodoButton');
const addTodoPopup = document.getElementById('addTodoPopup');
const saveButtonTodo = document.getElementById('saveButtonTodo');
const cancelButtonTodo = document.getElementById('cancelButtonTodo');

let selectedProject = null;
let currentEditingTodo = null;

export const addTodosToDOM = (todos) => {
    todosContainer.textContent = '';
    for (const todo of todos) {
        const todoDOM = document.createElement('div');
        const todoTitle = document.createElement('h1');
        todoTitle.textContent = todo.title;
        todoDOM.appendChild(todoTitle);
        todoDOM.className = 'todo-container';
        todoDOM.id = 'todo' + todo.id;

        const todoInfoPopup = document.createElement('div');
        const horizontalLine = document.createElement('hr');
        const todoInfo = document.createElement('p');
        todoInfo.innerHTML = '<strong>Description: </strong>' + todo.description + '<br><strong>Due Date: </strong>' + todo.dueDate + '<br><strong>Priority: </strong>' + todo.priority + '<br><strong>Notes: </strong>' + todo.notes;

        const todoButtons = document.createElement('div');
        
        const checkButton = document.createElement('button');
        checkButton.textContent = 'Complete';
        checkButton.className = 'check-button-todo';
        checkButton.addEventListener('click', function() {
            todo.checkList = !todo.checkList;
            if (todo.checkList) {
                todoTitle.style.textDecoration = 'line-through';
                checkButton.textContent = 'Undo';
            } else {
                todoTitle.style.textDecoration = 'none';
                checkButton.textContent = 'Complete';
            }
        })

        todoButtons.appendChild(checkButton);
        

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            // Populate the edit form with current todo values
            document.getElementById('todoTitleInputEdit').value = todo.title;
            document.getElementById('todoDescInputEdit').value = todo.description;
            document.getElementById('dueDateInputEdit').value = todo.dueDate;
            document.getElementById('priorityInputEdit').value = todo.priority;
            currentEditingTodo = todo;
            document.getElementById('editTodoPopup').style.display = 'block';
        })
        

        todoButtons.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function (event) {
            event.preventDefault();
            // Remove todo
            selectedProject.todos = selectedProject.todos.filter(
                currentTodo => currentTodo.id !== todo.id
            );

            // Update DOM
            addTodosToDOM(selectedProject.todos);
        })

        todoButtons.appendChild(deleteButton);

        todoInfoPopup.appendChild(horizontalLine);
        todoInfoPopup.appendChild(todoInfo);
        todoInfoPopup.appendChild(todoButtons);

        todoDOM.appendChild(todoInfoPopup);

        todoInfoPopup.style.display = 'none';

        todoDOM.addEventListener('click', function () {
            if (todoInfoPopup.style.display === 'none') {
                todoInfoPopup.style.display = 'block';
            } else {
                todoInfoPopup.style.display = 'none';
            }
        });
        
        todosContainer.appendChild(todoDOM);
    }
}

function editTodo(todo) {
    todo.title = document.getElementById('todoTitleInputEdit').value.trim();
    todo.description = document.getElementById('todoDescInputEdit').value;
    todo.dueDate = document.getElementById('dueDateInputEdit').value;
    todo.priority = document.getElementById('priorityInputEdit').value;

    // Re-render the todos for the selected project
    addTodosToDOM(selectedProject.todos);
    document.getElementById('editTodoPopup').style.display = 'none';
}



const renderSelectedProject = (project) => {
    selectedProject = project;
    const projectNameDOM = document.getElementById('projectName');
    projectNameDOM.textContent = project.name;
    addTodoDOM.style.display = 'block';
    addTodosToDOM(project.todos);
}

addTodoDOM.addEventListener('click', function () {
    addTodoPopup.style.display = 'block';
});

saveButtonTodo.addEventListener('click', function (event) {
    event.preventDefault();
    if (!selectedProject) {
        alert('Select a project before adding a todo.');
        return;
    }

    const todoTitleInput = document.getElementById('todoTitleInput').value.trim();
    const todoDescInput = document.getElementById('todoDescInput').value;
    const dueDateInput = document.getElementById('dueDateInput').value;
    const priorityInput = document.getElementById('priorityInput').value;

    if (!todoTitleInput) {
        alert('Todo title is required.');
        return;
    }

    addTodo(selectedProject.id, todoTitleInput, todoDescInput, dueDateInput, priorityInput, 'None', false);
    renderSelectedProject(selectedProject);
    addTodoPopup.style.display = 'none';
});

cancelButtonTodo.addEventListener('click', function (event) {
    event.preventDefault();
    addTodoPopup.style.display = 'none';
});

saveButtonTodoEdit.addEventListener('click', function (event) {
    event.preventDefault();
    if (currentEditingTodo) {
        editTodo(currentEditingTodo);
    }
});

cancelButtonTodoEdit.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('editTodoPopup').style.display = 'none';
});

export const addProjectsToDOM = (projects) => {
    projectsContainer.textContent = '';
    for (const project of projects) {
        const projectDOM = document.createElement('div');
        projectDOM.textContent = project.name;
        projectDOM.className = 'project-container';
        projectDOM.id = 'project' + project.id;
        projectDOM.addEventListener('click', function (event) {
            renderSelectedProject(project);
        });

        projectsContainer.appendChild(projectDOM);
    }
}

addProjectDOM.addEventListener('click', function () {
    addProjectPopup.style = 'display: block;';
});

saveButtonProject.addEventListener('click', function(event) {
    event.preventDefault();
    const projectNameInput = document.getElementById('projectNameInput').value;
    // prevent empty project name
    if (!projectNameInput) {
        alert("Project name can't be empty!");
    } else {
        addProject(projectNameInput);
        addProjectPopup.style = 'display: none;';
    }
});

cancelButtonProject.addEventListener('click', function (event) {
    event.preventDefault();
    addProjectPopup.style = 'display: none;';
});