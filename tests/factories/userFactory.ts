import { getRepository } from "typeorm";
import faker from 'faker'
import bcrypt, { hashSync } from 'bcrypt'
import User from "../../src/entities/User";

export async function createUser () {
  const email = faker.internet.email()
  const password = faker.internet.password()
  const hashedPassword = await hashSync(password, 10)
  const user = await getRepository(User).create({
    email: email,
    password: hashedPassword
  });
  await getRepository(User).save(user);
  return {email: email, password: password};
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