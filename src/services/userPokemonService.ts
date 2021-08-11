import { getRepository } from "typeorm";
import UserPokemon from "../entities/UserPokemon";
import Session from   "../entities/Session"

export async function addUserPokemon (token: string, pokemonId: number) {
    const session =  await getRepository(Session).findOne({token: token});
    await getRepository(UserPokemon).insert({
        userId: session.userId,
        pokemonId: pokemonId
    })
    return 200
}

export async function removeUserPokemon (token: string, pokemonId: number) {
    const session =  await getRepository(Session).findOne({token: token});
    await getRepository(UserPokemon).delete({
        userId: session.userId,
        pokemonId: pokemonId
    })
    return 200
}