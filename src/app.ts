import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as sessionController from "./controllers/sessionController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp)
app.post("/sign-in", sessionController.signIn);


export async function init () {
  await connectDatabase();
}

export default app;
