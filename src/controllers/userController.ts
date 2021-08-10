import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function postUser (req: Request, res: Response) {
  try {
    await userService.postUser(req.body);
    res.sendStatus(201)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
