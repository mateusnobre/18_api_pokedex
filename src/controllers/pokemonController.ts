import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons (req: Request, res: Response) {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization.split("Bearer ")[1];
    const {status, data} = await pokemonService.getPokemons(token);
    res.status(status).send(data)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}