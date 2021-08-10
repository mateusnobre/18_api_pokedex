import { getRepository } from "typeorm";
import Pokemon from   "../entities/Pokemon";

interface userData {
    userId: number
}

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

export async function getPokemons (userId: userData) {
    console.log("entrei")
    let pokemons = await getRepository(Pokemon).find();
    let responseData: pokemonData[] = [];
    console.log("sai")
    for (let i = 0; i < pokemons.length; i++) {
        responseData[i] = Object.assign({}, pokemons[i], {inMyPokemons: false})
    }
    return {status: 200, data: responseData}
}