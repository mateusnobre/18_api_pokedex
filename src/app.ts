import "./setup";
import {Request, Response} from 'express'
import express from "express";
import cors from "cors";
import "reflect-metadata";
import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as sessionController from "./controllers/sessionController";
import * as pokemonController from "./controllers/pokemonController";
import * as userPokemonController from './controllers/usersPokemonsController'
import Session from "./entities/Session";
import { getRepository } from "typeorm";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp)
app.post("/sign-in", sessionController.signIn);
app.get("/pokemons", verifyToken, pokemonController.getPokemons)
app.post("/my-pokemons/:pokemonId/add", verifyToken, userPokemonController.addUserPokemon)
app.post("/my-pokemons/:pokemonId/remove", verifyToken, userPokemonController.removeUserPokemon)


export async function init () {
  await connectDatabase();
}

async function verifyToken(req : Request, res: Response, next: () => Response) {
  const authorization = req.headers["authorization"];
  const token = authorization.split("Bearer ")[1];

  const repository = getRepository(Session);
  const session = await repository.findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }
  next();
}

export default app;
