
import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createPokemon } from "../factories/pokemonFactory";
import { createUser } from "../factories/userFactory"
import { clearPokemons } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearPokemons();
});

afterAll(async () => {
  await getConnection().close();
});

describe("get /pokemons", () => {
  it("returns 200 for valid token", async () => {
    const user = await createUser();
    const login = await supertest(app).get("/sign-in").send(user)
    const token = login.body.token;
    const header = {Authorization: `Bearer ${token}`}
    for (let i = 0; i < 10; i++){
        await createPokemon()
    }
    const result = await supertest(app).get("/pokemons").set(header);
    const status = result.status;
    const pokemons = result.body
    expect(status).toEqual(200);
    expect(pokemons).toHaveLength(10)
    expect(pokemons).toEqual(
     expect.arrayContaining([
      expect.objectContaining({
       id: expect.any(Number),
       name: expect.any(String),
       number: expect.any(Number),
       image: expect.any(String),
       weight: expect.any(Number),
       height: expect.any(Number),
       baseExp: expect.any(Number),
       description: expect.any(String),
       inMyPokemons: expect.any(Boolean)
      }),
     ])
    )
  });
  it("returns 401 for invalid token", async () => {
    const token = "some random token";
    const header = {Authorization: `Bearer ${token}`}
    const result = await supertest(app).get("/pokemons").set(header);
    const status = result.status;
    const pokemons = result.body
    expect(status).toEqual(401);
    expect(pokemons).toHaveLength(0)
});
});