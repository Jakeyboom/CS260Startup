//Here, I will implement the login service that will allow a user to self authenticate.
//Note that the temporary implementation will simply allow a user to login locally using a password, but in the future, this will be replaced with a more secure authentication method (some kind of hashing).
import { confirmStringIsValid } from "./assignment-service.js";
import express from "express";

const app = express();
app.use(express.json());


const users = [];


export function login(email, password) {

    //for now, this will just push the email and password to local storage and do a log.
    console.log('Attempting to log in with email:' + email + ', password: ' + password);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.some((user) => user.email === email && user.password === password)) {
        console.log("User authenticated successfully.");
        localStorage.setItem("currentUser", JSON.stringify({email}))

        return true;
    } else {
        console.log("Authentication failed. Invalid email or password.");
        return false;
    }

    //TODO: Implement authentication here.
    
}

export function createAccount(email, password) {
    //First, check to make sure that email and password aren't empty; if they are, return false and log an error.
    if(!confirmStringIsValid(email) || !confirmStringIsValid(password)) {
        console.log("Email and password cannot be empty. Cannot create account.");
        return false;
    }
    console.log('Creating account with email:' + email + ', password: ' + password);
    const users = JSON.parse(localStorage.getItem("users")) || [];
    //Right here, I will check if the email is already in use; if not, I will create the account and push it to local storage.

    if(!users.some((user) => user.email === email)) {
        localStorage.setItem("users", JSON.stringify([...users, {email, password}]));
        localStorage.setItem(`classes_${email}`, JSON.stringify([]));
        console.log("Account created successfully.");
        return login(email, password);
    } else {
        console.log("Email is already in use.");
        return false;
    }

    //TODO: Implement account creation and verification here.
}

export function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("Current user: " + (currentUser ? currentUser.email : "None"));
    return currentUser ? currentUser.email : null;
}

//logs out the current user by removing the current user from local storage.
export function logout() {
    localStorage.removeItem("currentUser");
    console.log("User logged out successfully.");
}

//Checks if a user is currently logged in by checking if there is a current user in local storage.
export function isLoggedIn() {
    return getCurrentUser() !== null;
}

export function getCurrentUserObject() {
    const email = getCurrentUser();
    
    if(!email) {
        console.log("No user is currently logged in. Cannot retrieve user object");
        return null;
    }

    const users = JSON.parse(localStorage.getItem("users)") || []);
    const userObject = users.find((user) => user.email === email);

    if(!userObject) {
        console.log("User has not made an account (somehow). Please make an account and try again.");
        return null;
    }

    return userObject;
}



const port = 4000;
app.listen(port, function () {
    console.log("Login service is running on port " + port);
});



//Here, I will start to reimplement the login, logout, and account creation as endpoints.


/**
 * POST /api/auth HTTP/2
       Content-Type: application/json
       {
        "email":"example@example.com",
        "password":"password"
       }

       (Response)
       HTTP/2 200 OK
       Content-Type: application/json
       Set-Cookie: auth=tokenHere

       {
        "email":"example@example.com"
       }
 */

//Here, lets implement the create account endpoint listening on /api/auth as a POST request.

app.post("/api/auth", async (req, res) => {
    if(!req.body) {
        console.log("No request body provided. Cannot create account.");
        res.status(400).send("No request body provided. Cannot create account.");
    } else if(!req.body.email || !req.body.password) {
        console.log("Email and password are required. Cannot create account.");
        res.status(400).send("Email and password are required. Cannot create account.");
    } else if (!confirmStringIsValid(req.body.email) || !confirmStringIsValid(req.body.password)) {
        console.log("Email and password cannot be empty. Cannot create account.");
        res.status(400).send("Email and password cannot be empty. Cannot create account.");
    }

    users.push({email: req.body.email, password: req.body.password});

    console.log("Received request to create account with email");
    res.send({email: req.body.email});
})