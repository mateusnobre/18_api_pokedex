
import { Request, Response } from "express";

import * as sessionService from "../services/sessionService";

export async function signIn (req: Request, res: Response) {
  try {
    const {status, token} = await sessionService.signIn(req.body);
    res.status(status).send({token: token});
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}