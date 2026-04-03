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
import { WebSocketServer } from "ws";

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("rental");

const userCollection = db.collection("users");
const classCollection = db.collection("classes");
const assignmentCollection = db.collection("assignments");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use("/api/auth", loginRouter);
app.use("/api/classes", isAuthenticated, classRouter);
app.use("/api/assignments", isAuthenticated, assignmentRouter)



const port = process.argv.length > 2 ? process.argv[2] : 4000;

const wss = new WebSocketServer({ port: 8080 });


const server = app.listen(port, function () {
    console.log("API services are running on port " + port);
});


//Here, I will create a websocket object.
const socketServer = new WebSocketServer({ server });

//Here, I will setup the websocket server to listen for incoming connections and handle them appropriately.
socketServer.on("connection", (ws) => {
    console.log("New WebSocket connection established.");
    ws.isAlive = true;

    ws.on('message', (message) => {
        console.log("Received WebSocket message: ", message);
        //For right now, I will just log the message to the console to make sure that the websocket connection is working properly.
    })

    ws.on('close', () => {
        console.log("WebSocket connection closed.");
    });


    //Right here, I will setup a heartbeat to make sure that the client is still connected and responsive.
    const heartBeatInterval = setInterval(() => {
        socketServer.clients.forEach((client) => {
            if(!client.isAlive) {
                console.log("WebSocket client is not responsive. Terminating connection.");
                client.terminate();
            }
            client.isAlive = false;
            client.ping();
        })
    }, 10000);

    //Right here, if the client responds to the ping, we will set isAlive to true to indicate that the connection is still alive and responsive.
    ws.on('pong', () => {
        console.log("Received pong from client. WebSocket connection is alive.");
        ws.isAlive = true;
    });


})

async function isAuthenticated(req, res, next) {
    const authToken = req.cookies["authToken"];
    if(!authToken) {
        console.log("No auth token provided. User is not authenticated.");
        res.status(401).send("No auth token provided. User is not authenticated.");
    } else {
        //Here, We will check to make sure that the auth token is valid and corresponds to a user in our system.
        const user = await getCurrentUser(authToken);
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

export { userCollection, classCollection, assignmentCollection };
