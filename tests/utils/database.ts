import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import Pokemon  from '../../src/entities/Pokemon'
import UserPokemon from "../../src/entities/UserPokemon";

export async function clearUsers () {
  await getRepository(User).delete({});
}

export async function clearSessions () {
  await getRepository(Session).delete({});
}

export async function clearPokemons () {
  await getRepository(Pokemon).delete({});
}
export async function clearUserPokemons () {
  await getRepository(UserPokemon).delete({});
}