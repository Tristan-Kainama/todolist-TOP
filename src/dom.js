import { addProject } from "./project-logic.js";
import { addTodo } from "./todos-logic.js";

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

export const addTodosToDOM = (todos) => {
    todosContainer.textContent = '';
    for (const todo of todos) {
        const todoDOM = document.createElement('div');
        todoDOM.textContent = todo.title;
        todoDOM.className = 'todo-container';
        todoDOM.id = 'todo' + todo.id;
        todosContainer.appendChild(todoDOM);
    }
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