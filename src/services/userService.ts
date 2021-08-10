import { getRepository } from "typeorm";

import User from "../entities/User";

interface UserCreate {
  name: string;
  password: string;
  confirmPassword: string;
}

export async function postUser (user: UserCreate) {
  await getRepository(User).insert(user);
}
