import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createInvalidEmailSignInBody, createUser} from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});
describe("POST /sign-in", () => {
  it("returns 200 for valid params", async () => {
    const user = createUser();
    const result = await supertest(app).post("/sign-up").send(user);
    const status = result.status;
    expect(status).toEqual(200);
    
    expect(result.body).toEqual(
        expect.objectContaining({
          token: expect.any(String)
        })
    );
  });

  it("returns 401 for authentication error", async () => {
    const user = await createUser()
    user.password = user.password + "random"
    const invalidPasswordResult = await supertest(app)
      .post("/sign-in")
      .send(user);
    expect(invalidPasswordResult).toEqual(401);
  });

  it("returns 400 for request with invalid email", async () => {
    const invalidEmailBody = createInvalidEmailSignInBody()
    const invalidEmailResult = await supertest(app)
      .post("/sign-in")
      .send(invalidEmailBody);
    const invalidEmailstatus = invalidEmailResult.status;
    expect(invalidEmailstatus).toEqual(400);
    const user = await createUser()
    user.email = user.password + "random"
    const inexistentEmailResult = await supertest(app)
      .post("/sign-in")
      .send(user);
    expect(inexistentEmailResult).toEqual(400);
  });
});