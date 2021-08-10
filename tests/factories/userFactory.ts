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

export async function createValidSignUpBody(){
  const password = faker.internet.password()  
  const user = {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password
  }
  return user
}

export async function createUnmatchedPasswordsSignUpBody(){
  const password = faker.internet.password()  
  const user = {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password + "wrong"
  }
  return user
}

export async function createInvalidEmailSignUpBody(){
  const password = faker.internet.password()  
  const user = {
    email: "somerandomemail",
    password: password,
    confirmPassword: password
  }
  return user
}

export async function createInvalidEmailSignInBody(){
  const password = faker.internet.password()  
  const user = {
    email: "somerandomemail",
    password: password,
  }
  return user
}