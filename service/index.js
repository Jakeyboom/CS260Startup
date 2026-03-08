import "./login-service.js"
import "./class-service.js"
import "./assignment-service.js"

import express from "express";
import cookieParser from "cookie-parser";


import { loginRouter } from "./login-service.js";
import { classRouter } from "./class-service.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", loginRouter);
app.use("/api/classes", classRouter);

const port = 4000;
app.listen(port, function () {
    console.log("API services are running on port " + port);
});