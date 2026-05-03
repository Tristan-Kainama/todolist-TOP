import { addProject } from "./project-logic.js";

const projectsContainer = document.getElementById('projectsContainer');
const todosContainer = document.getElementById('todosContainer');

const addProjectDOM = document.getElementById('addProject');
const addProjectPopup = document.getElementById('addProjectPopup');
const saveButtonProject = document.getElementById('saveButtonProject');
const cancelButtonProject = document.getElementById('cancelButtonProject');

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