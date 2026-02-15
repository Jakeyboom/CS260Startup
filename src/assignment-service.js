//Here will implement the assignment service that will allow a user to create, read, update, and delete assignments. For now, this will be a simple implementation that uses local storage to store the assignments, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.

export function createAssignment(assignmentName, className, dueDate) {
    console.log('Attempting to create assignment: ' + assignmentName + ', class: ' + className + ', due date: ' + dueDate);
}

export function editAssignment(assignmentId, assignmentName, className, dueDate) {
    console.log('Attempting to edit assignment: ' + assignmentId + ', new name: ' + assignmentName + ', new class: ' + className + ', new due date: ' + dueDate);
}

export function deleteAssignment(assignmentName, className) {
    console.log('Attempting to delete assignment: ' + assignmentName + ', class: ' + className);
}