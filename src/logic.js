export const projects = [];

class todo {
    constructor(title, description, dueDate, priority, notes, checkList){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checkList = checkList;
    }
}

export const addTodo = (title, description, dueDate, priority, notes, checkList) => {
    const newTodo = new todo(title, description, dueDate, priority, notes, checkList);
    projects.push(newTodo);
}