import { getRepository } from "typeorm";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
export async function clearUsers () {
  await getRepository(User).delete({});
}

export async function clearSessions () {
  await getRepository(Session).delete({});
}
