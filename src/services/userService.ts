import { getRepository } from "typeorm";
import bcrypt from 'bcrypt'
import User from "../entities/User";

interface UserCreate {
  email: string;
  password: string;
  confirmPassword: string;
}

export async function signUp (user: UserCreate) {
  const {email, password, confirmPassword} = user
  if (validateEmail(email)) {
      if (password === confirmPassword){
      const findIfEmailExists = await getRepository(User).findOne({email: email})
      if (findIfEmailExists){
        return 409;
      }
      else {
        const hashedPassword = await bcrypt.hashSync(password, 10);
        await getRepository(User).insert({
          email: email,
          password: hashedPassword
        });
        return 201;
      }
    }
    else {
      return 400;
    }
  }
  else {
    return 400;
  }
}

function validateEmail(email: string) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}