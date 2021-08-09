import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";
import Session from "./entities/Session";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", userController.getUsers);

export async function init () {
  await connectDatabase();
}

async function verifyToken(req, res) {
  const authorization = req.headers["authorization"];
  const token = authorization.split("Bearer ")[1];

  const repository = getRepository(Session);
  const session = await repository.findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }
}

export default app;
