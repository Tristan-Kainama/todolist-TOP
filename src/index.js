import "./styles.css";
import { addProject, projects } from "./project-logic.js";
import { addTodo } from "./todos-logic.js";
import { addProjectsToDOM } from "./dom.js";

// Add Projects When First Opening
addProjectsToDOM(projects);

addProject('Home');
addProject('School');

addTodo(0, 'Buy Groceries', 'Buying Groceries', '2024-06-01', 'high', 'None', true, 0);

console.log(projects);