//Here will implement the assignment service that will allow a user to create, read, update, and delete assignments. For now, this will be a simple implementation that uses local storage to store the assignments, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.
import { getCurrentUserClasses } from "./class-service.js";
import { getCurrentUser } from "./login-service.js";
import { verifyClassExists } from "./class-service.js";
import express from "express";

const router = express.Router();

const assignments = []; //[{assignmentName, className, dueDate, difficulty, email}, ...]

function createAssignment(assignmentToCreate) {

    if(!verifyClassExists(assignmentToCreate.className, assignmentToCreate.email)) {
        console.log("Class does not exist. Cannot create assignment " + assignmentToCreate.assignmentName);
        return false;
    } else if (assignments.some((a) => a.assignmentName === assignmentToCreate.assignmentName && a.email === assignmentToCreate.email && a.className === assignmentToCreate.className)) {
        console.log("Assignment already exists. Cannot create assignment.");
        return false;
    } else {
        assignments.push(assignmentToCreate);
        return true;
    }

    return false;

}

function editAssignment() {

}

export function deleteAssignmentsFromClass(className) {

}


export function deleteAssignment(currentAssignmentName, currentClassName, email) {
    console.log('Attempting to delete assignment: ' + currentAssignmentName + ', class: ' + currentClassName + ", email: " + email);
    if(!confirmStringIsValid(currentAssignmentName) || !confirmStringIsValid(currentClassName || !email)) {
        console.log("All fields are required. Cannot delete assignment.");
        return false;
    } 

    const assignmentsKept = assignments.filter((a) => !(a.assignmentName === currentAssignmentName && a.className === currentClassName && a.email === email))
    assignments.length = 0;
    assignments.push(...assignmentsKept);
    return true;


}

export function confirmStringIsValid(inputString) {
    if(inputString === null || inputString === undefined) {
        return false;
    } else if(inputString.length === 0) {
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

export function getUserAssignments(email) {
    return assignments.filter((a) => a.email === email);
}

// function sortAssignmentsByDueDate(assignments) {
//     return assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
// }

// export function getAllAssignmentsSortedByDueDate(email) {
//     const userAssignments = assignments.filter((a) => a.email === email)

//      return sortAssignmentsByDueDate(userAssignments);
// }

export function handleDeleteAllAssignmentsFromClass(className) {
    console.log("Attempting to delete all classes from class " + className)
}

export function renameClassForAllAssignments(oldClassName, newClassName) {
    console.log("Attempting to rename class " + oldClassName + " to " + newClassName)
}

/**
 * GET /api/assignments/ - Get all assignments for the current user, sorted by due date
 * {
 * }
 * 
 * RESPONSE:
 * {
 *  assignments: [{assignmentName, className, dueDate, difficulty, email}, ...]
 * }
 */

router.get("/", async (req, res) => {
    const user = req.user;
    const email = user.email;
    if(!email) {
        console.log("No user is currently logged in. Cannot get assignments.");
        res.status(401).send("No user is currently logged in. Cannot get assignments.");
        return;
    }

    console.log("Received GET request to get all assignments for current user.");
    //MAYBE SEE IF I NEED TO AUTHENTICATE THE COOKIE AGAIN; AS I ALWAYS DO THROUGH APP, IT SHOULD BE AUTHENTICATED.
    const userAssignments = getUserAssignments(email);
    res.status(200).send({assignments: userAssignments});
    
    return;
});

router.post("/", async (req, res) => {
    console.log("Received POST request to create a new assignment for current user.");

    if(!req.body) {
        console.log("No request body provided. Cannot create assignment.");
        res.status(400).send("No request body provided. Cannot create assignment.");
        return;
    } else if(!req.body.assignmentName || !req.body.className || !req.body.dueDate || !req.body.difficulty) {
        console.log("Missing parameters in request body.  Assignment cannot be created.");
        res.status(400).send("All fields required");
        return;
    } else if(!confirmStringIsValid(req.body.assignmentName) || !confirmStringIsValid(req.body.className) || !confirmStringIsValid(req.body.dueDate) || !confirmStringIsValid(req.body.difficulty)) {
        console.log("Invalid parameters in request body. Assignment cannot be created.");
        res.status(400).send("Invalid parameters in request body. Assignment cannot be created.");
        return;
    }

    if(createAssignment({assignmentName: req.body.assignmentName, className: req.body.className, dueDate: req.body.dueDate, difficulty: req.body.difficulty, email: req.user.email})) {
        console.log("Assignment created successfully.");
        res.status(200).send("Assignment created successfully.");
        return;
    } else {
        console.log("Assignment could not be created. Check server logs for more details.");
        res.status(400).send("Assignment could not be created. Check server logs for more details.");
        return;
    }
});

router.put("/", async (req, res) => {
    console.log("Received PUT request to edit an assignment for current user.");
    res.status(500).send("Not implemented yet.");
});

router.delete("/", async (req, res) => {
    console.log("Received DELETE request to delete an assignment for current user.");
    if(!req.body) {
        console.log("No request body provided. Cannot delete assignment.");
        res.status(400).send("No request body provided. Cannot delete assignment.");
        return;
    }

    if(deleteAssignment(req.body.assignmentName, req.body.className, req.user.email)) {
        console.log("Assign")
});

export { router as assignmentRouter };