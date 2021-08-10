import {Request, Response} from 'express';
import { getRepository } from "typeorm";
import bcrypt, { compareSync } from "bcrypt";
import {v4 as uuid} from 'uuid'
import Session from "../entities/Session";
import User from "../entities/User"

interface userData {
  email: string;
  password: string;
}

export async function signIn (userData: userData) {
  let { email, password } = userData;
  const user = await getRepository(User).findOne({email: email});
  if (!user){
    return {status: 400, token: ""}
  }
  else if (!(await bcrypt.compare(password, user.password))){
    return {status: 401, token: ""}  
  }
  else {  
    const session = await getRepository(Session).findOne({ userId: user.id });
    if (session){
      return {status: 200, token: session.token};
    }
    else {
      const session = {userId: user.id, token: uuid().toString()}
      await getRepository(Session).insert(session);
      console.log(session.token)
      return {status: 200, token: session.token};
    }
  }
}

async function verifyToken(req: Request, res : Response) {
  const authorization = req.headers["authorization"];
  const token = authorization.split("Bearer ")[1];

  const repository = getRepository(Session);
  const session = await repository.findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }
}
