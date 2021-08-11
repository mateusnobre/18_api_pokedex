import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createPokemon } from "../factories/pokemonFactory";
import { createUser } from "../factories/userFactory"
import { clearPokemons, clearSessions, clearUsers } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearSessions();
  await clearUsers();
  await clearPokemons();
});

afterAll(async () => {
  await getConnection().close();
});

describe("get /pokemons", () => {
  it("returns 200 for valid token", async () => {
    const user = await createUser();
    const login = await supertest(app).post("/sign-in").send(user)
    const token = login.body.token;
    const bearerToken = `Bearer ${token}`
    const pokemon1 = await createPokemon()
    const pokemon2 = await createPokemon()
    const result = await supertest(app).get("/pokemons").set('authorization', bearerToken);
    const status = result.status;
    const pokemons = result.body
    expect(status).toEqual(200);
    expect(pokemons).toHaveLength(2)
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
    const bearerToken = `Bearer ${token}`
    const result = await supertest(app).get("/pokemons").set('authorization', bearerToken);
    const status = result.status;
    expect(status).toEqual(401);
  });
});