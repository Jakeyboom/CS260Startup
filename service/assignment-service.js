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

function editAssignment(oldAssignmentName, oldClassName, newAssignmentName, newClassName, newDueDate, newDifficulty, email) {
    console.log('Attempting to edit assignment: ' + oldAssignmentName + ', class: ' + oldClassName + ", email: " + email);
    if(!confirmStringIsValid(oldAssignmentName) || !confirmStringIsValid(oldClassName) || !confirmStringIsValid(newAssignmentName) || !confirmStringIsValid(newClassName) || !confirmStringIsValid(newDueDate) || !confirmStringIsValid(newDifficulty) || !confirmStringIsValid(email)) {
        console.log("All fields are required. Cannot edit assignment.");
        return false;
    } else if(!verifyClassExists(newClassName, email)) {
        console.log("New class does not exist. Cannot edit assignment.");
        return false;
    } else if(assignments.find((a) => a.assignmentName === newAssignmentName && a.className === newClassName && a.email === email && !(a.assignmentName === oldAssignmentName && a.className === oldClassName))) {
        console.log("An assignment with this name already exists.  Cannot edit assignment.");
        return false;
    }

    const assignmentToEdit = assignments.find((a) => a.assignmentName === oldAssignmentName && a.className === oldClassName && a.email === email);
    if(!assignmentToEdit) {
        console.log("Assignment to edit does not exist. Cannot edit assignment.");
        return false;
    } else {
        assignmentToEdit.assignmentName = newAssignmentName;
        assignmentToEdit.className = newClassName;
        assignmentToEdit.dueDate = newDueDate;
        assignmentToEdit.difficulty = newDifficulty;
        return true;
    }
}

function deleteAssignment(currentAssignmentName, currentClassName, email) {
    console.log('Attempting to delete assignment: ' + currentAssignmentName + ', class: ' + currentClassName + ", email: " + email);
    if(!confirmStringIsValid(currentAssignmentName) || !confirmStringIsValid(currentClassName) || !confirmStringIsValid(email)) {
        console.log("All fields are required. Cannot delete assignment.");
        return false;
    } 

    const assignmentsKept = assignments.filter((a) => !(a.assignmentName === currentAssignmentName && a.className === currentClassName && a.email === email))
    assignments.length = 0;
    assignments.push(...assignmentsKept);
    return true;


}

export function deleteAssignmentsFromClass(className, email) {
    const newAssignments = assignments.filter((a) => !(a.className === className && a.email === email));
    assignments.length = 0;
    assignments.push(...newAssignments);
}




export function confirmStringIsValid(inputString) {
    if(inputString == null) {
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

export function renameClassForAllAssignments(oldClassName, newClassName, email) {
    console.log("Attempting to rename class " + oldClassName + " to " + newClassName)
    if(!confirmStringIsValid(oldClassName) || !confirmStringIsValid(newClassName) || !confirmStringIsValid(email)) {
        console.log("Invalid class names provided.");
        return false;
    }

    for(let assignment of assignments) {
        if(assignment.className === oldClassName && assignment.email === email) {
            assignment.className = newClassName;
            console.log("Renamed class for assignment: " + assignment.assignmentName);
        }
    }

    return true;
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
    if(!req.body) {
        console.log("No request body provided. Cannot edit assignment.");
        res.status(400).send("No request body provided. Cannot edit assignment.");
        return;
    } else if (!req.body.oldAssignmentName || !req.body.oldClassName || !req.body.newAssignmentName || !req.body.newClassName || !req.body.newDueDate || !req.body.newDifficulty) {
        console.log("Missing parameters in request body.  Assignment cannot be edited.");
        res.status(400).send("All fields required");
        return;
    } else if(editAssignment(req.body.oldAssignmentName, req.body.oldClassName, req.body.newAssignmentName, req.body.newClassName, req.body.newDueDate, req.body.newDifficulty, req.user.email)) {
        console.log("Assignment edited successfully.");
        res.status(200).send({message: "Assignment edited successfully.", newAssignment: {assignmentName: req.body.newAssignmentName, className: req.body.newClassName, dueDate: req.body.newDueDate, difficulty: req.body.newDifficulty}});
        return;
    } else {
        console.log("Assignment could not be edited. Check server logs for more details.");
        res.status(400).send("Assignment could not be edited. Check server logs for more details.");
        return;
    }
});

router.delete("/", async (req, res) => {
    console.log("Received DELETE request to delete an assignment for current user.");
    if(!req.body) {
        console.log("No request body provided. Cannot delete assignment.");
        res.status(400).send("No request body provided. Cannot delete assignment.");
        return;
    } else if(!req.body.assignmentName || !req.body.className || !req.user || !req.user.email) {
        console.log("Missing parameters in request body.  Assignment cannot be deleted.");
        res.status(400).send("All fields required");
        return;
    }

    if(deleteAssignment(req.body.assignmentName, req.body.className, req.user.email)) {
        console.log("Assignment deleted successfully.");
        res.status(200).send("Assignment deleted successfully.");
        return;
    } else {
        console.log("Assignment could not be deleted. Check server logs for more details.");
        res.status(400).send("Assignment could not be deleted. Check server logs for more details.");
        return;
    }
});

export { router as assignmentRouter };