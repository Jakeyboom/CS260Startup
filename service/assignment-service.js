//Here will implement the assignment service that will allow a user to create, read, update, and delete assignments. For now, this will be a simple implementation that uses local storage to store the assignments, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.
import { getCurrentUserClasses } from "./class-service.js";
import { getCurrentUser, isLoggedIn } from "./login-service.js";

export function createAssignment(assignmentName, className, dueDate, difficulty) {
    console.log('Attempting to create assignment: ' + assignmentName + ', class: ' + className + ', due date: ' + dueDate +', difficulty: ' + difficulty);
    if(!isLoggedIn()) {
        console.log("No user is currently logged in. Cannot create assignment.");
        return false;
    }

    if(!confirmStringIsValid(className) || !confirmStringIsValid(assignmentName) || !confirmStringIsValid(dueDate) || !confirmStringIsValid(difficulty)) {
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
    if(classes[classIndex].assignments.some((a) => a.name === assignmentName)) {
        console.log("An assignment with the same name already exists in this class. Cannot create duplicate assignment.");
        return false;
    }

    const newAssignment = {name: assignmentName, dueDate: dueDate, difficulty: difficulty, className: className};
    classes[classIndex].assignments.push(newAssignment);
    sortAssignmentsByDueDate(classes[classIndex].assignments);

    localStorage.setItem(`classes_${email}`, JSON.stringify(classes));


    console.log('Assignment created successfully.');
    return true;
}

export function handleEditAssignment(currentAssignmentName, currentClassName, newAssignmentName, newClassName, newDueDate, newDifficulty) {
    console.log(`Attempting to edit assignment${currentClassName}: ` + currentAssignmentName + ', new name: ' + newAssignmentName + ', new class: ' + newClassName + ', new due date: ' + newDueDate + ', new difficulty: ' + newDifficulty);

    if(!confirmStringIsValid(currentAssignmentName) || !confirmStringIsValid(currentClassName) || !confirmStringIsValid(newAssignmentName) || !confirmStringIsValid(newClassName) || !confirmStringIsValid(newDueDate) || !confirmStringIsValid(newDifficulty)) {
        console.log("All fields are required. Cannot edit assignment.");
        return false;
    }
    let currentClasses = getCurrentUserClasses();

    if(!currentClasses.some((c) => c.className === currentClassName)) {
        console.log("Could not find class. Cannot edit assignment.");
        return false;
    }

    for (let c of currentClasses) {
        if(!c.assignments.some((a) => a.name === currentAssignmentName)) {
            continue;
        }

        for(let assignment of c.assignments) {

            //Maybe rewrite this part in the future to be more efficient and less confusing.
            if(assignment.name === currentAssignmentName) {
                if(currentClassName !== newClassName) {
                    //Since I know that the new class name is valid (since it is selected from a dropdown of the user's current classes), I can safely assume that the new class exists, so I don't need to check for that again here.
                    //Now, I need to check if the new assignment name already exists in the new class; if it does, then I cannot edit the assignment to have the new name (since that would create a duplicate assignment in the new class), so I will return false.
                    const newClass = currentClasses.find((c) => c.className === newClassName);
                    if(newClass.assignments.some((a) => a.name === newAssignmentName)) {
                        console.log("An assignment with the new name already exists in the new class. Cannot edit assignment.");
                        return false;
                    } else {
                        //Here, since I just checked that the new assignment name does not already exist in the new class, I can safely assume that it is valid to move the assignment to the new class, so I will do that here.
                        //It might just be easier to create a new assignmneent in the new class with the new information, and then delete the old assignment from the old class, rather than trying to edit the existing assignment and move it to the new class, since that would be less confusing and less error-prone.
                        const created = createAssignment(newAssignmentName, newClassName, newDueDate, newDifficulty);
                        if(created) {

                            return handleDeleteAssignment(currentAssignmentName, currentClassName);
                        }

                        return false;
                    }
                } else {
                    //If the class name is not changing, then we just update the assignment's properties.
                    assignment.name = newAssignmentName;
                    assignment.dueDate = newDueDate;
                    assignment.difficulty = newDifficulty;
                    
                    sortAssignmentsByDueDate(c.assignments);

                    localStorage.setItem(`classes_${getCurrentUser()}`, JSON.stringify(currentClasses));

                    console.log("Found and edited assignment successfully.");
                    return true;

                }



            }
        }
    }
    
    console.log(`Could not find the assignment specified: ${currentAssignmentName} in class ${currentClassName}. Cannot edit assignment.`);
    return false;
}

export function handleDeleteAssignment(currentAssignmentName, currentClassName) {
    console.log('Attempting to delete assignment: ' + currentAssignmentName + ', class: ' + currentClassName);
    let currentClasses = getCurrentUserClasses();
    if(!confirmStringIsValid(currentAssignmentName) || !confirmStringIsValid(currentClassName)) {
        console.log("All fields are required. Cannot delete assignment.");
        return false;
    } 

    if(!currentClasses.some((c) => c.className === currentClassName)) {
        console.log("Could not find class. Cannot delete assignment.");
        return false;
    }

    for (let c of currentClasses) {
        if(c.className === currentClassName) {
            if(!c.assignments.some((a) => a.name === currentAssignmentName)) {
                console.log("could not find assignment. Cannot delete assignment.");
                return false;
            } else {
                c.assignments = c.assignments.filter((a) => a.name !== currentAssignmentName);
                localStorage.setItem(`classes_${getCurrentUser()}`, JSON.stringify(currentClasses));
                console.log("Found and deleted assignment successfully.");
                return true;
            }
        }
    }

    console.log("Something went wrong.  Could not delete assignment.");
    return false;
}

export function confirmStringIsValid(inputString) {
    if(inputString.length === 0) {
        return false;
    }

    const inputStringCharacters = inputString.split('');
    //Here, we will check if the string contains only whitespace characters; if it is only whitespace characters, we will return false.
    let hasNonWhitespaceCharacter = false;
    for (let character of inputStringCharacters) {
        if (character.trim() === '') {
            continue;
        } else {
            hasNonWhitespaceCharacter = true;
            break;
        }
    }

    if(!hasNonWhitespaceCharacter) {
        return false;
    }

    return true;
}

function sortAssignmentsByDueDate(assignments) {
    return assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
}

export function getAllAssignmentsSortedByDueDate() {
    const classes = getCurrentUserClasses();
    const allAssignments = classes.flatMap((c) => c.assignments);

     return sortAssignmentsByDueDate(allAssignments);
}