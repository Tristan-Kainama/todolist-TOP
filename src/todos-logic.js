import { projects } from './project-logic.js';

let todoLength = 0;

class todo {
    constructor(title, description, dueDate, priority, notes, checkList, id){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
        this.id = id;
    }
}

export const addTodo = (projectId, title, description, dueDate, priority, notes, checkList) => {
    const newTodo = new todo(title, description, dueDate, priority, notes, checkList, todoLength);
    todoLength++;
    projects[projectId].todos.push(newTodo);
}