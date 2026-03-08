import "./login-service.js"
import "./class-service.js"
import "./assignment-service.js"

import express from "express";
import cookieParser from "cookie-parser";


import { loginRouter } from "./login-service.js";
import { classRouter } from "./class-service.js";
import { getCurrentUser} from "./login-service.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", loginRouter);
app.use("/api/classes", isAuthenticated, classRouter);

const port = 4000;
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
