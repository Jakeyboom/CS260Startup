import { getCurrentUser } from "./login-service.js";
import { confirmStringIsValid } from "./assignment-service.js";
import express from "express";
const router = express.Router();

const classes = []; 

//A class object will now be of the form: {email, className, difficulty}
//Here will implement the class service that will allow a user to create, read, update, and delete classes. For now, this will be a simple implementation that uses local storage to store the classes, but in the future, this will be replaced with a more robust implementation that uses a backend server and database.
//An example of a class object will be: {className: "CS260", assignments [{id: 0, name: "Assignment 1", dueDate: "2024-01-01"}]};

//Returns the array containing the classes of the current user.  If the user is not logged in or is logged in but has not made an account (somehow), this will return null.
export function getCurrentUserClasses(authToken) {
    const user = getCurrentUser(authToken);
    const email = user ? user.email : null;

    if(!email) {
        console.log("No user is currently logged in. Cannot get classes.");
        return [];
    }

    return classes.filter((c) => c.email === email);
}


//This command pushed a class to a current user's classes.

export function pushClassToCurrentUser(classObject, email) {


    if(!email) {
        console.log("No user is currently logged in. Cannot push class.");
        return false;
    }


    if(!confirmStringIsValid(classObject.className) || !confirmStringIsValid(classObject.difficulty)) {
        console.log("All fields are required. Cannot push class.");
        return false;
    }

    if(classes.some((c) => c.className === classObject.className && c.email === email)) {
        console.log("Class already exists in user's classes. Cannot push duplicate class.");
        return false;
    }

    classes.push(classObject);

    sortClassesByDifficulty(classes);
    console.log("Class pushed successfully.");

    return true;
}


//These functions will be implemented for editing and deleting classes.  For now, they will just be placeholders.

export function handleEditClass(oldClassName, newClassName, newDifficulty, email) {
    console.log("Attempting to edit clase: " + oldClassName + ", new name: " + newClassName + ", new difficulty: " + newDifficulty + ", authToken: ");

    if(!confirmStringIsValid(newClassName) || !confirmStringIsValid(newDifficulty) || !confirmStringIsValid(oldClassName)) {
        console.log("All fields are required. Cannot edit class.");
        return false;
    }

    if(!classes.some((c) => c.className === oldClassName && c.email === email)) {
        console.log("Class to edit does not exist.  Cannot edit class.");
        return false;   
    }

    if(classes.some((c) => c.className === newClassName && c.email === email) && newClassName !== oldClassName) {
        console.log("Class with new name already exists. Cannot edit class to have duplicate name.");
        return false;
    }

    const classToEdit = classes.find((c) => c.className === oldClassName && c.email === email);
    classToEdit.className = newClassName;
    classToEdit.difficulty = newDifficulty;

    sortClassesByDifficulty(classes);
    return true;
    //TODO: Implement adding assignments; once we have the assignment implemented, implement editing the class name for all assignments with the same class name.
    
    // for(let c of userClasses) {
    //     if(c.className === oldClassName) {
    //         c.className = newClassName;
    //         c.difficulty = newDifficulty
    //         for(let a of c.assignments) {
    //             a.className = newClassName;
    //         }

    //         const sortedClasses = sortClassesByDifficulty(userClasses);
    //         localStorage.setItem(`classes_${getCurrentUser()}`, JSON.stringify(sortedClasses))
    //         return true;
    //     }
    // }
    // return false;
}

export function handleDeleteClass(classNameToDelete, email) {
    if(!confirmStringIsValid(classNameToDelete)) {
        console.log("Class name is required. Cannot delete class.");
        return false;
    } else if (!email) {
        console.log("No user is currently logged in. Cannot delete class.");
        return false;
    }

    console.log("Attempting to delete class: " + classNameToDelete);
    if(classes.some((c) => c.className === classNameToDelete && c.email === email)) {
        const kept = classes.filter((c) => !(c.className === classNameToDelete && c.email === email));
        classes.length = 0;
        classes.push(...kept);
        
        console.log("Class deleted successfully.");
        return true;
    } else {
        console.log("Class not found.  Cannot delete class.")
        return false;
    }
}

function sortClassesByDifficulty(classes) {
    console.log("Sorting classes by difficulty...");
    const difficultyOrder = {"easy": 1, "medium": 2, "hard": 3};
    return classes.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
}

export function verifyClassExists(className, email) {
    if(!confirmStringIsValid(className) || !confirmStringIsValid(email)) {
        console.log("Invalid class name or email.");
        return false;
    }
    return classes.some((c) => c.className === className && c.email === email);
}

/**
 * REQUEST: GET /api/classes/
 * { (empty / no body)
 * }
 * Cookies: {authToken: (token)}
 * Response: 200 OK
 * {
 *     classes: [...array of class objects...]
 * }
 */

router.get("/", (req, res) => {
    console.log("Received request to get classes for current user.");
    const authToken = req.cookies["authToken"];
    const userClasses = getCurrentUserClasses(authToken);

    res.status(200).send({classes: userClasses});
    return;
})

/***
 * Request for POST:
 * POST /api/classes/
 * {    
 *     className: (string),
 *     difficulty: (string)
 * }
 * Cookies: {authToken: (token)}
 * 
 * Response: 200 OK
 * {
 *    message: "Class pushed successfully.",
 *    className: (string)
 * }
 */

router.post("/", (req, res) => {
    console.log("Received request to push class to current user.");
    if(!req.body) {
        console.log("No request body provided. Cannot push class.");
        res.status(400).send("No request body provided. Cannot push class.");
        return;
    } else if(!req.body.className || !req.body.difficulty) {
        console.log("Class name and difficulty are required. Cannot push class.");
        res.status(400).send("Class name and difficulty are required. Cannot push class.");
        return;
    }

    const currentUser = getCurrentUser(req.cookies["authToken"]);
    if(!currentUser) {
        console.log("User is not authenticated. Cannot push class.");
        res.status(401).send("User is not authenticated. Cannot push class.");
        return;
    }
    const newClassObject = {email: currentUser.email, className: req.body.className, difficulty: req.body.difficulty};

    if(pushClassToCurrentUser(newClassObject, currentUser.email)) {
        res.status(200).send({message: "Class pushed successfully.", className: req.body.className});
        return;
    } else {
        res.status(400).send("Failed to push class. Class may already exist or fields may be invalid.");
        return;
    }

});

router.put("/", (req, res) => {
    console.log("Received request to edit class for current user.");
    if(! req.body) {
        console.log("No request body provided. Cannot edit class.");
        res.status(400).send("No request body provided. Cannot edit class.");
        return
    } else if (!req.body.oldClassName || !req.body.newClassName || !req.body.newDifficulty) {
        console.log("Old class name, new class name, and new difficulty are required. Cannot edit class.");
        res.status(400).send("Old class name, new class name, and new difficulty are required. Cannot edit class.");
        return
    }

    const currentUserEmail = req.user ? req.user.email : null;

    if(!currentUserEmail) {
        console.log("User is not authenticated. Cannot edit class.");
        res.status(401).send("User is not authenticated. Cannot edit class.");
        return
    }

    //TODO: Implement editing all asignments with the same class name to have the new class name.

    if(handleEditClass(req.body.oldClassName, req.body.newClassName, req.body.newDifficulty, currentUserEmail)) {
        res.status(200).send({message: "Class edited successfully.", className: req.body.newClassName});
        return
    } else {
        res.status(400).send("Failed to edit class. Class may not exist or fields may be invalid.");
        return
    }
});

/**
 * Request for DELETE:
 * DELETE /api/classes/
 * {
 *     className: (string)
 * }
 * Cookies: {authToken: (token)}
 * 
 * Response: 200 OK
 * {
 *     message: "Class deleted successfully.",
 *     className: (string)
 * }
 */

router.delete("/", (req, res) => {
    console.log("Received request to delete class for current user.");

    if(!req.body) {
        console.log("No request body provided. Cannot delete class.");
        res.status(400).send("No request body provided. Cannot delete class.");
        return
    }
    else if (!req.body.className) {
        console.log("Class name is required. Cannot delete class.");
        res.status(400).send("Class name is required. Cannot delete class.");
        return
    }

    if(handleDeleteClass(req.body.className, req.user.email)) {
        res.status(200).send({message: "Class deleted successfully.", className: req.body.className});
        return
    } else {
        res.status(400).send("Failed to delete class. Class may not exist.");
        return
    }

});

export {router as classRouter};