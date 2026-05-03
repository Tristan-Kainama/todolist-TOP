import "./styles.css";
import { addProject } from "./project-logic.js";
import { projects, addTodo } from "./project-logic.js";
import { addProjectsToDOM } from "./dom.js";

// Add Projects When First Opening
addProjectsToDOM(projects);

addProject('Work');
addProject('School');

console.log(projects);