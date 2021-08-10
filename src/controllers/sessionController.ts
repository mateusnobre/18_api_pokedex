
import { Request, Response } from "express";

import * as sessionService from "../services/sessionService";

export async function postSession (req: Request, res: Response) {
  try {
    await sessionService.postSession(req.headers);
    res.sendStatus(201)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
