import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createPokemon } from "../factories/pokemonFactory";
import { createUser } from "../factories/userFactory"
import { clearUserPokemons, clearPokemons, clearSessions, clearUsers } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearUserPokemons();
  await clearSessions();
  await clearUsers();
  await clearPokemons();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /my-pokemons/:id/add", () => {
  it("returns 200 for valid token", async () => {
    const user = await createUser();
    const login = await supertest(app).post("/sign-in").send(user)
    const token = login.body.token;
    const bearerToken = `Bearer ${token}`
    const pokemon = await createPokemon()
    const result = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('authorization', bearerToken);
    const status = result.status;
    expect(status).toEqual(200);

    const pokemons = await supertest(app).get(`/pokemons`).set('authorization', bearerToken);
    expect(pokemons.body.length).toEqual(1)
  });
  it("returns 401 for invalid token", async () => {
    const token = "some random token";
    const bearerToken = `Bearer ${token}`
    const pokemon = await createPokemon()
    const result = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('authorization', bearerToken);
    const status = result.status;
    expect(status).toEqual(401);
  });
});

describe("POST /my-pokemons/:id/remove", () => {
  it("returns 200 for valid token", async () => {
    const user = await createUser();
    const login = await supertest(app).post("/sign-in").send(user)
    const token = login.body.token;
    const bearerToken = `Bearer ${token}`
    const pokemon = await createPokemon()
    const addPokemon = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('authorization', bearerToken);
    const result = await supertest(app).post(`/my-pokemons/${pokemon.id}/remove`).set('authorization', bearerToken);
    const status = result.status;
    expect(status).toEqual(200);
  });
  it("returns 401 for invalid token", async () => {
    const token = "some random token";
    const bearerToken = `Bearer ${token}`
    const pokemon = await createPokemon()
    const addPokemon = await supertest(app).post(`/my-pokemons/${pokemon.id}/add`).set('authorization', bearerToken);
    const result = await supertest(app).post(`/my-pokemons/${pokemon.id}/remove`).set('authorization', bearerToken);
    const status = result.status;
    expect(status).toEqual(401);
  });
});