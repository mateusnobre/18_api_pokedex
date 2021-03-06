import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createValidSignUpBody, createInvalidEmailSignUpBody, createUnmatchedPasswordsSignUpBody} from "../factories/userFactory";
import { clearUsers, clearSessions } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearSessions();
  await clearUsers();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("returns 201 for valid params", async () => {
    const body = await createValidSignUpBody()
    const result = await supertest(app).post("/sign-up").send(body);
    const status = result.status;
    expect(status).toEqual(201);
  });

  it("returns 409 for duplicate emails", async () => {
    const body = await createValidSignUpBody()
    const result1 = await supertest(app).post("/sign-up").send(body);
    expect(result1.status).toEqual(201);
    const result2 = await supertest(app).post("/sign-up").send(body);
    expect(result2.status).toEqual(409);
  });

  it("returns 400 for request invalid e-mail", async () => {
    const invalidEmailBody = await createInvalidEmailSignUpBody()
    const invalidEmailResult = await supertest(app)
      .post("/sign-up")
      .send(invalidEmailBody);
    expect(invalidEmailResult.status).toEqual(400);
  });
  
  it("returns 400 for request with unmatched passwords", async () => {
    const unmatchedPasswordsBody = await createUnmatchedPasswordsSignUpBody()
    const unmatchedPasswordsResult = await supertest(app)
      .post("/sign-up")
      .send(unmatchedPasswordsBody);
    expect(unmatchedPasswordsResult.status).toEqual(400);
  });
});