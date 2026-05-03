import { projects } from './project-logic';

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

const addTodo = (title, description, dueDate, priority, notes, checkList, id) => {
    const newTodo = new Todo(title, description, dueDate, priority, notes, checkList, id);
    return newTodo;
}