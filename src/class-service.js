import { getCurrentUser } from "./login-service.js";
//Here will implement the class service that will allow a user to create, read, update, and delete classes. For now, this will be a simple implementation that uses local storage to store the classes, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.
//An example of a class object will be: {className: "CS260", assignments [{id: 0, name: "Assignment 1", dueDate: "2024-01-01"}]};

//Returns the array containing the classes of the current user.  If the user is not logged in or is logged in but has not made an account (somehow), this will return null.
export function getCurrentUserClasses() {
    debugger
    const email = getCurrentUser();

    if(!email) {
        console.log("No user is currently logged in. Cannot get classes.");
        return [];
    }

    return JSON.parse(localStorage.getItem(`classes_${email}`)) || [];
}


//This command pushed a class to a current user's classes.

export function pushClassToCurrentUser(classObject) {
    const email = getCurrentUser();

    if(!email) {
        console.log("No user is currently logged in. Cannot push class.");
        return false;
    }

    const oldClasses = JSON.parse(localStorage.getItem(`classes_${email}`)) || [];

    if(oldClasses.some((c) => c.className === classObject.className)) {
        console.log("Class already exists in user's classes. Cannot push duplicate class.");
        return false;
    }

    localStorage.setItem(`classes_${email}`, JSON.stringify([...oldClasses, classObject]));
    console.log("Class pushed successfully.");
    return true;
}
