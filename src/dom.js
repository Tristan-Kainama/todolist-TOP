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

export const addTodosToDOM = (todos) => {
    for (const todo of todos) {
        const todoDOM = document.createElement('div');
        todoDOM.textContent = todo.name;
        todoDOM.className = 'todo-container';
        todoDOM.id = 'todo' + todo.id;
        todosContainer.appendChild(todoDOM);
    }
}

addTodoDOM.addEventListener('click', function () {
    addTodoPopup.style = 'display: block;';
});

export const addProjectsToDOM = (projects) => {
    projectsContainer.textContent = '';
    for (const project of projects) {
        const projectDOM = document.createElement('div');
        projectDOM.textContent = project.name;
        projectDOM.className = 'project-container';
        projectDOM.id = 'project' + project.id;
        projectDOM.addEventListener('click', function (event) {
            const projectNameDOM = document.getElementById('projectName');
            projectNameDOM.textContent = project.name;

            const todosContainer = document.getElementById('todosContainer');
            todosContainer.textContent = '';
            addTodosToDOM(project.todos);

            addTodoButton.style = 'display: block;';
            saveButtonTodo.addEventListener('click', function (event) {
                event.preventDefault();
                console.log('test');
            });

            cancelButtonTodo.addEventListener('click', function (event) {
                event.preventDefault();
                addTodoPopup.style = 'display: none;';
            });
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