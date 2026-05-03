export let projects = [];
let projectLength = 0;
import { addProjectsToDOM } from "./dom.js";

class Project {
    constructor(id, name, todos) {
        this.id = id;
        this.name = name;
        this.todos = todos;
    }
}

export const addProject = (name) => {
    projectLength++;
    const id = projectLength;
    const todos = [];
    const newProject = new Project(id, name, todos);
    projects.push(newProject);

    addProjectsToDOM(projects);
}