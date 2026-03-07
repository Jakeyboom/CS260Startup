//Here, I will implement the login service that will allow a user to self authenticate.
//Note that the temporary implementation will simply allow a user to login locally using a password, but in the future, this will be replaced with a more secure authentication method (some kind of hashing).
import { confirmStringIsValid } from "./assignment-service.js";
import express from "express";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
app.use(cookieParser());

const users = [];


export function login(email, password, res) {

    //for now, this will just push the email and password to local storage and do a log.
    console.log('Attempting to log in with email:' + email + ', password: ' + password);
    if(users.some((user) => user.email === email && user.password === password)) {
        const currentUser = users.find((user) => user.email === email);
        generateAndAttachAuthToken(currentUser, res);
        console.log("User authenticated successfully.");

        return true;
    } else {
        console.log("Authentication failed. Invalid email or password.");
        return false;
    }

    //TODO: Implement authentication here.
    
}

export function createAccount(email, password, res) {
    //First, check to make sure that email and password aren't empty; if they are, return false and log an error.
    if(!confirmStringIsValid(email) || !confirmStringIsValid(password)) {
        console.log("Email and password cannot be empty. Cannot create account.");
        return false;
    }
    console.log('Creating account with email:' + email + ', password: ' + password);
    //Right here, I will check if the email is already in use; if not, I will create the account and push it to local storage.

    if(!users.some((user) => user.email === email)) {
        users.push({email, password, authToken: null});
        console.log("Account created successfully.");
        return login(email, password, res);
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

export function getCurrentUserObject(authToken) {


    return userObject;
}

function generateAndAttachAuthToken(user, res) {
    const authToken = uuidv4();
    user.authToken = authToken;
    res.cookie('authToken', user.authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
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

    if(createAccount(req.body.email, req.body.password, res)) {
        res.status(200).send({email: req.body.email});
    } else {
        res.status(400).send("Account creation failed. Email may already be in use.");
    }

})

app.put("/api/auth", async (req, res) => {
    if(!req.body) {
        console.log("No request body provided. Cannot log in.");
        res.status(400).send("No request body provided. Cannot log in.");
    } else if(!req.body.email || !req.body.password) {
        console.log("Email and password are required. Cannot log in.");
        res.status(400).send("Email and password are required. Cannot log in.");
    }

    if(login(req.body.email, req.body.password, res)) {
        res.status(200).send({email: req.body.email});
    } else {
        res.status(400).send("Login failed. Invalid email or password.");
    }
})

app.delete("/api/auth", async (req, res) => {
    res.status(500).send("Not implemented yet.");
})


/**
 * How do I want to store a user?
 *  Better implementation would be to store the user object as having an email, password, and auth token.
 *  If a user is unauthenticated, the authtoken will be null; if authenticated, it will be a uuid string.
 */