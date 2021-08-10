import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  try {
    const status = await userService.signUp(req.body);
    res.sendStatus(status)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
