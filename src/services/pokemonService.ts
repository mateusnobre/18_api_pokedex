import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import Session from "../entities/Session"
import User from "../entities/User";
import UserPokemon from "../entities/UserPokemon"

interface pokemonData {

    id: number,
    name: string,
    number: number,
    image: string,
    weight: number,
    height: number,
    baseExp: number,
    description: string,
    inMyPokemons: boolean,
}

export async function getPokemons (token: string) {
    let pokemons = await getRepository(Pokemon).find();
    const session =  await getRepository(Session).findOne({token: token});
    const usersPokemons =  await getRepository(UserPokemon).find({userId: session.userId});
    const usersPokemonsIds = usersPokemons.map((up) => up.pokemonId)

    let responseData: pokemonData[] = [];
    for (let i = 0; i < pokemons.length; i++) {
        if (usersPokemonsIds.includes(pokemons[i].id)){
            responseData[i] = Object.assign({}, pokemons[i], {inMyPokemons: true})
        }
        else {
            responseData[i] = Object.assign({}, pokemons[i], {inMyPokemons: false})
        }
    }
    return {status: 200, data: responseData}
}