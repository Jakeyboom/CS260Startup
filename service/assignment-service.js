//Here will implement the assignment service that will allow a user to create, read, update, and delete assignments. For now, this will be a simple implementation that uses local storage to store the assignments, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.
import { verifyClassExists } from "./class-service.js";
import express from "express";
import { assignmentCollection, confirmDatabaseConnection, sendMessage } from "./index.js";

const router = express.Router();

async function createAssignment(assignmentToCreate) {

    if(!(await verifyClassExists(assignmentToCreate.className, assignmentToCreate.email))) {
        
        console.log("Class does not exist. Cannot create assignment " + assignmentToCreate.assignmentName);
        return false;
    } else if (await assignmentCollection.findOne({className: assignmentToCreate.className, assignmentName: assignmentToCreate.assignmentName, email: assignmentToCreate.email})) {
        console.log("Assignment already exists. Cannot create assignment.");
        return false;
    } else {
        const result = await assignmentCollection.insertOne(assignmentToCreate);
        return result.acknowledged;
    }

}

async function editAssignment(oldAssignmentName, oldClassName, newAssignmentName, newClassName, newDueDate, newDifficulty, email) {
    console.log('Attempting to edit assignment: ' + oldAssignmentName + ', class: ' + oldClassName + ", email: " + email);
    if(!confirmStringIsValid(oldAssignmentName) || !confirmStringIsValid(oldClassName) || !confirmStringIsValid(newAssignmentName) || !confirmStringIsValid(newClassName) || !confirmStringIsValid(newDueDate) || !confirmStringIsValid(newDifficulty) || !confirmStringIsValid(email)) {
        console.log("All fields are required. Cannot edit assignment.");
        return false;
    } else if(!(await verifyClassExists(newClassName, email))) {
        console.log("New class does not exist. Cannot edit assignment.");
        return false;
    } else if(oldAssignmentName !== newAssignmentName || oldClassName !== newClassName) { //Checks if the assignment name or class name is being changed
        console.log("Checking if assignment with new name and class already exists before editing assignment.");
        const existingAssignment = await assignmentCollection.findOne({assignmentName: newAssignmentName, className: newClassName, email: email});
        if(existingAssignment) {
            console.log("An assignment with this name already exists in the database. Cannot edit assignment.");
            return false;
        }
    } else if(!await assignmentCollection.findOne({assignmentName: oldAssignmentName, className: oldClassName, email: email})) {
        console.log("Assignment to edit does not exist in the database. Cannot edit assignment.");
        return false;
    }
    const query = {assignmentName: oldAssignmentName, className: oldClassName, email: email};
    const update = {$set: {assignmentName: newAssignmentName, className: newClassName, dueDate: newDueDate, difficulty: newDifficulty}};

    const result = await assignmentCollection.updateOne(query, update);
    if(result.matchedCount === 0) {
        console.log("No assignment was found with the provided information. Cannot edit assignment.");
        return false;
    }

    console.log("Assignment updated successfully in the database.");
    return true;

}

async function deleteAssignment(currentAssignmentName, currentClassName, email) {
    console.log('Attempting to delete assignment: ' + currentAssignmentName + ', class: ' + currentClassName + ", email: " + email);
    if(!confirmStringIsValid(currentAssignmentName) || !confirmStringIsValid(currentClassName) || !confirmStringIsValid(email)) {
        console.log("All fields are required. Cannot delete assignment.");
        return false;
    }

    const result = await assignmentCollection.deleteOne({assignmentName: currentAssignmentName, className: currentClassName, email: email});
    if(result.deletedCount === 0) {
        console.log("No assignment was deleted. Check if the assignment exists with the provided information.");
        return false;
    }

    return true;


}

export async function deleteAssignmentsFromClass(className, email) {
    const result = await assignmentCollection.deleteMany({className: className, email: email});
    console.log("Deleted " + result.deletedCount + " assignments from class " + className);
    return result.deletedCount > 0;
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

export async function getUserAssignments(email) {
    const userAssignments = await assignmentCollection.find({email: email}).toArray();
    const sortedAssignments = sortAssignments(userAssignments);
    return sortedAssignments;
}

function sortAssignments(userAssignments) {
    return [...userAssignments].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
}

// export function getAllAssignmentsSortedByDueDate(email) {
//     const userAssignments = assignments.filter((a) => a.email === email)

//      return sortAssignmentsByDueDate(userAssignments);
// }

export async function renameClassForAllAssignments(oldClassName, newClassName, email) {
    console.log("Attempting to rename class " + oldClassName + " to " + newClassName)
    if(!confirmStringIsValid(oldClassName) || !confirmStringIsValid(newClassName) || !confirmStringIsValid(email)) {
        console.log("Invalid class names provided.");
        return false;
    }

    const query = {className: oldClassName, email:email};
    const update = {$set: {className: newClassName}};
    const result = await assignmentCollection.updateMany(query, update);
    if(result.modifiedCount > 0) {
        console.log("Renamed class for " + result.modifiedCount + " assignments in the database.");
    } else {
        console.log("No assignments were updated in the database. Check if there are any assignments with class name " + oldClassName + " for user " + email);
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
    if(!await confirmDatabaseConnection()) {
        console.log("Cannot connect to database. Cannot get assignments.");
        res.status(500).send("Cannot connect to database. Cannot get assignments.");
        return;
     }

    const user = req.user;
    const email = user.email;
    if(!email) {
        console.log("No user is currently logged in. Cannot get assignments.");
        res.status(401).send("No user is currently logged in. Cannot get assignments.");
        return;
    }

    console.log("Received GET request to get all assignments for current user.");
    //MAYBE SEE IF I NEED TO AUTHENTICATE THE COOKIE AGAIN; AS I ALWAYS DO THROUGH APP, IT SHOULD BE AUTHENTICATED.
    const userAssignments = await getUserAssignments(email);
    res.status(200).send({assignments: userAssignments});
    
    return;
});

router.post("/", async (req, res) => {
    if(!await confirmDatabaseConnection()) {
        console.log("Cannot connect to database. Cannot create assignment.");
        res.status(500).send("Cannot connect to database. Cannot create assignment.");
        return;
     }

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

    if(await createAssignment({assignmentName: req.body.assignmentName, className: req.body.className, dueDate: req.body.dueDate, difficulty: req.body.difficulty, email: req.user.email})) {
        console.log("Assignment created successfully.");
        sendMessage(req.user.email, req.body.className, req.body.assignmentName, "ASSIGNMENT_CREATED");
        res.status(200).send("Assignment created successfully.");
        return;
    } else {
        console.log("Assignment could not be created. Check server logs for more details.");
        res.status(400).send("Assignment could not be created. Check server logs for more details.");
        return;
    }
});

router.put("/", async (req, res) => {
    if(!await confirmDatabaseConnection()) {
        console.log("Cannot connect to database. Cannot edit assignment.");
        res.status(500).send("Cannot connect to database. Cannot edit assignment.");
        return;
     }

    console.log("Received PUT request to edit an assignment for current user.");

    if(!req.body) {
        console.log("No request body provided. Cannot edit assignment.");
        res.status(400).send("No request body provided. Cannot edit assignment.");
        return;
    } else if (!req.body.oldAssignmentName || !req.body.oldClassName || !req.body.newAssignmentName || !req.body.newClassName || !req.body.newDueDate || !req.body.newDifficulty) {
        console.log("Missing parameters in request body.  Assignment cannot be edited.");
        res.status(400).send("All fields required");
        return;
    } else if(await editAssignment(req.body.oldAssignmentName, req.body.oldClassName, req.body.newAssignmentName, req.body.newClassName, req.body.newDueDate, req.body.newDifficulty, req.user.email)) {
        console.log("Assignment edited successfully.");
        sendMessage(req.user.email, req.body.newClassName, req.body.newAssignmentName, "ASSIGNMENT_EDITED");
        res.status(200).send({message: "Assignment edited successfully.", newAssignment: {assignmentName: req.body.newAssignmentName, className: req.body.newClassName, dueDate: req.body.newDueDate, difficulty: req.body.newDifficulty}});
        return;
    } else {
        console.log("Assignment could not be edited. Check server logs for more details.");
        res.status(400).send("Assignment could not be edited. Check server logs for more details.");
        return;
    }
});

router.delete("/", async (req, res) => {
    if(!await confirmDatabaseConnection()) {
        console.log("Cannot connect to database. Cannot delete assignment.");
        res.status(500).send("Cannot connect to database. Cannot delete assignment.");
        return;
     }
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

    if(await deleteAssignment(req.body.assignmentName, req.body.className, req.user.email)) {
        console.log("Assignment deleted successfully.");
        sendMessage(req.user.email, req.body.className, req.body.assignmentName, "ASSIGNMENT_DELETED");
        res.status(200).send("Assignment deleted successfully.");
        return;
    } else {
        console.log("Assignment could not be deleted. Check server logs for more details.");
        res.status(400).send("Assignment could not be deleted. Check server logs for more details.");
        return;
    }
});

export { router as assignmentRouter };