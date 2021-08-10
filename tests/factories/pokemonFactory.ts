import { getRepository } from "typeorm";
import faker from 'faker'
import Pokemon from "../../src/entities/Pokemon";

export async function createPokemon () {
  const pokemon = await getRepository(Pokemon).create({
    name: faker.name.findName(),
    number: faker.datatype.number(),
    image: faker.internet.url(),
    weight: faker.datatype.number(),
    height: faker.datatype.number(),
    baseExp: faker.datatype.number(),
    description: faker.datatype.string()
  });
  await getRepository(Pokemon).save(pokemon);
  return pokemon;
}
