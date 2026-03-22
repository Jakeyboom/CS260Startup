//Here, I will implement the login service that will allow a user to self authenticate.
//Note that the temporary implementation will simply allow a user to login locally using a password, but in the future, this will be replaced with a more secure authentication method (some kind of hashing).
import { confirmStringIsValid } from "./assignment-service.js";
import express from "express";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { database } from "./index.js";

const router = express.Router();

const users = [];


export async function login(email, password, res) {
    if(!confirmDatabaseConnection()) {
        console.log("Cannot perform login. No database connection.");
        return false;
    }


    //for now, this will just push the email and password to local storage and do a log.
    console.log('Attempting to log in with email:' + email);

    const userToAuthenticate = users.find((user) => user.email === email);
    if(!userToAuthenticate) {
        console.log("No account with that email exists. Cannot log in.");
        return false;
    }


    const isMatch = await bcrypt.compare(password, userToAuthenticate.password);

    if(isMatch) {
        generateAndAttachAuthToken(userToAuthenticate, res);
        console.log("User authenticated successfully.");
        return true;
    } else {
        console.log("Authentication failed. Invalid email or password.");
        return false;
    }
    
}

export async function createAccount(email, password, res) {
    //First, check to make sure that email and password aren't empty; if they are, return false and log an error.
    if(!confirmStringIsValid(email) || !confirmStringIsValid(password)) {
        console.log("Email and password cannot be empty. Cannot create account.");
        return false;
    }
    console.log('Creating account with email:' + email);
    //Right here, I will check if the email is already in use; if not, I will create the account and push it to local storage.

    if(!users.some((user) => user.email === email)) {
        const passwordHash = await bcrypt.hash(password, 10);
        users.push({email, password: passwordHash, authToken: null});
        console.log("Account created successfully.");
        return await login(email, password, res);
    } else {
        console.log("Email is already in use.");
        return false;
    }

    //TODO: Implement account creation and verification here.
}


export function getCurrentUser(authToken) {
    return users.find((user) => user.authToken === authToken);
   
}

export function getCurrentUserObject(authToken) {
    const userObject = users.find((user) => user.authToken === authToken);

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







//Here, I will start to reimplement the login, logout, and account creation as endpoints.


/**
 * POST / HTTP/2
       Content-Type: application/json
       {
        "email":"example@example.com",
        "password":"password"
       }

       (Response)
       HTTP/2 200 OK
       Content-Type: application/json
       Set-Cookie=tokenHere

       {
        "email":"example@example.com"
       }
 */

//Here, lets implement the create account endpoint listening on / as a POST request.

router.post("/", async (req, res) => {
    if(!req.body) {
        console.log("No request body provided. Cannot create account.");
        res.status(400).send("No request body provided. Cannot create account.");
        return;
    } else if(!req.body.email || !req.body.password) {
        console.log("Email and password are required. Cannot create account.");
        res.status(400).send("Email and password are required. Cannot create account.");
        return;
    } else if (!confirmStringIsValid(req.body.email) || !confirmStringIsValid(req.body.password)) {
        console.log("Email and password cannot be empty. Cannot create account.");
        res.status(400).send("Email and password cannot be empty. Cannot create account.");
        return;
    }

    if(await createAccount(req.body.email, req.body.password, res)) {
        res.status(200).send({email: req.body.email});
        return;
    } else {
        res.status(400).send("Account creation failed. Email may already be in use.");
        return;
    }

})

router.put("/", async (req, res) => {
    if(!req.body) {
        console.log("No request body provided. Cannot log in.");
        res.status(400).send("No request body provided. Cannot log in.");
        return;
    } else if(!req.body.email || !req.body.password) {
        console.log("Email and password are required. Cannot log in.");
        res.status(400).send("Email and password are required. Cannot log in.");
        return;
    }

    if(await login(req.body.email, req.body.password, res)) {
        res.status(200).send({email: req.body.email});
        return;
    } else {
        res.status(400).send("Login failed. Invalid email or password.");
        return;
    }
})

router.delete("/", async (req, res) => {
    const currentUser = getCurrentUserObject(req.cookies['authToken']);
    if(currentUser) {
        currentUser.authToken = null;
    }
    res.clearCookie("authToken");
    res.status(200).send("User logged out successfully.");
    return;
})

async function confirmDatabaseConnection() {
    try {
        await database.command({ping:1});
        console.log("Successfully connected to the database.");
        return true;
    } catch(error) {
        console.error("Failed to connect to the database. Error: ", error.message);
        return false;
    }
}


export { router as loginRouter };

/**
 * How do I want to store a user?
 *  Better implementation would be to store the user object as having an email, password,  token.
 *  If a user is unauthenticated, the authtoken will be null; if authenticated, it will be a uuid string.
 */

//DELETE ME

