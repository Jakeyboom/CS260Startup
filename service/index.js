import "./login-service.js"
import "./class-service.js"
import "./assignment-service.js"
import config from "./dbConfig.json" with { type: "json"};

import { MongoClient } from "mongodb";
import express from "express";
import cookieParser from "cookie-parser";
import { loginRouter } from "./login-service.js";
import { classRouter } from "./class-service.js";
import { assignmentRouter } from "./assignment-service.js";
import { getCurrentUser } from "./login-service.js";

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("rental");

const userCollection = db.collection("users");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use("/api/auth", loginRouter);
app.use("/api/classes", isAuthenticated, classRouter);
app.use("/api/assignments", isAuthenticated, assignmentRouter)



const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, function () {
    console.log("API services are running on port " + port);
});

function isAuthenticated(req, res, next) {
    const authToken = req.cookies["authToken"];
    if(!authToken) {
        console.log("No auth token provided. User is not authenticated.");
        res.status(401).send("No auth token provided. User is not authenticated.");
    } else {
        //Here, We will check to make sure that the auth token is valid and corresponds to a user in our system.
        const user = getCurrentUser(authToken);
        if(!user) {
            console.log("Invalid auth token. User is not authenticated.");
            res.clearCookie("authToken");
            res.status(401).send("Invalid auth token. User is not authenticated.  Unauthenticated authToken cleared.");
        } else {
            req.user = user;
            next();
        }
    }
};

export async function confirmDatabaseConnection() {
    try {
        await db.command({ping:1});
        console.log("Successfully connected to the database.");
        return true;
    } catch(error) {
        console.error("Failed to connect to the database. Error: ", error.message);
        return false;
    }
}

export { userCollection };
