//Here will implement the assignment service that will allow a user to create, read, update, and delete assignments. For now, this will be a simple implementation that uses local storage to store the assignments, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.
import { getCurrentUserClasses } from "./class-service.js";
import { getCurrentUser, isLoggedIn } from "./login-service.js";

export function createAssignment(assignmentName, className, dueDate, difficulty) {
    debugger
    console.log('Attempting to create assignment: ' + assignmentName + ', class: ' + className + ', due date: ' + dueDate +', difficulty: ' + difficulty);
    if(!isLoggedIn()) {
        console.log("No user is currently logged in. Cannot create assignment.");
        return false;
    }

    if(className === "" || assignmentName === "" || dueDate === "" || difficulty === "") {
        console.log("All fields are required. Cannot create assignment.");
        return false;
    }

    //Maybe implement some more validation here in the future (like checking if the due date is a valid date, etc.)

    const email = getCurrentUser();

    const classes = getCurrentUserClasses();
    //Right here, I will check if the class exists; if it does not, I will return false.
    if(!classes.some((c) => c.className === className)) {
        console.log("Class does not exist. Cannot create assignment.");
        return false;
    }

    const classIndex = classes.findIndex((c) => c.className === className);
    const newAssignment = {name: assignmentName, dueDate: dueDate, difficulty: difficulty};
    classes[classIndex].assignments.push(newAssignment);

    localStorage.setItem(`classes_${email}`, JSON.stringify(classes));


    console.log('Assignment created successfully.');
    return true;
}

export function editAssignment(assignmentId, assignmentName, className, dueDate) {
    console.log('Attempting to edit assignment: ' + assignmentId + ', new name: ' + assignmentName + ', new class: ' + className + ', new due date: ' + dueDate);
}

export function deleteAssignment(assignmentName, className) {
    console.log('Attempting to delete assignment: ' + assignmentName + ', class: ' + className);
}