import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons (req: Request, res: Response) {
  try {
    console.log("começo")
    const {status, data} = await pokemonService.getPokemons(req.body);
    res.status(status).send(data)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}