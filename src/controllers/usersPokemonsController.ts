import { Request, Response } from "express";

import * as userPokemonService from "../services/userPokemonService";

export async function addUserPokemon (req: Request, res: Response) {
  try {
    const authorization = req.headers["authorization"];
    const { pokemonId } = req.params
    const token = authorization.split("Bearer ")[1];
    const status = await userPokemonService.addUserPokemon(token, parseInt(pokemonId));
    res.sendStatus(status)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function removeUserPokemon (req: Request, res: Response) {
  try {
    const authorization = req.headers["authorization"];
    const { pokemonId } = req.params
    const token = authorization.split("Bearer ")[1];
    const status = await userPokemonService.removeUserPokemon(token, parseInt(pokemonId));
    res.sendStatus(status)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}