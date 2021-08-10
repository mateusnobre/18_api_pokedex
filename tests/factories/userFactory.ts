import { getRepository } from "typeorm";
import faker from 'faker'
import User from "../../src/entities/User";

export async function createUser () {
  const user = await getRepository(User).create({
    email: faker.internet.email(),
    password: faker.internet.password()
  });
  await getRepository(User).save(user);
  return user;
}

export async function createValidUserBody(){
  const password = faker.internet.password()  
  const user = {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password
  }
  return user
}


export async function createUnmatchedPasswordsUserBody(){
  const password = faker.internet.password()  
  const user = {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password + "wrong"
  }
  return user
}

export async function createInvalidEmailUserBody(){
  const password = faker.internet.password()  
  const user = {
    email: "somerandomemail",
    password: password,
    confirmPassword: password
  }
  return user
}