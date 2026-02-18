import { getCurrentUser, getCurrentUserClasses } from "./login-service.js";
//Here will implement the class service that will allow a user to create, read, update, and delete classes. For now, this will be a simple implementation that uses local storage to store the classes, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.
//An example of a class object will be: {className: "CS260", assignments [{id: 0, name: "Assignment 1", dueDate: "2024-01-01"}]};

export function createClass(className, difficulty) {
    debugger;
    console.log('Attempting to create class: ' + className + ', difficulty: ' + difficulty);
    const email = getCurrentUser();

    if(!email) {
        console.log("No user is currently logged in. Cannot create class.");
        return false;
    }


    const userClasses = getCurrentUserClasses();

    if(userClasses.some((findClass) => findClass.className === className)) {
        console.log("Class with name " + className + " already exists. Cannot create class.");
        return false;
    }
    userObject.userClasses = [...userClasses, {className, difficulty, assignments: []}];

    localStorage.setItem("users", JSON.stringify(localStorage.getItem("users").map((user) => user.email === email ? userObject : user)));

    return true;
}
