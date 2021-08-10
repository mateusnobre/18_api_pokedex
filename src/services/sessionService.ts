
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import Session from "../entities/Session";
import User from "../entities/User"

interface userData {
  email: string;
  password: string;
}

export async function postSession (userData: userData) {
  let { email, password } = userData;

  const user = await getRepository(User).findOne({email: email});
  if (!user || !(await bcrypt.compare(password, user.password)))
    throw Error("Authentication Error");

  const session = await getRepository(Session).findOne({ userId: user.id });

  await getRepository(Session).insert(session);

}


    if (!user || !(await bcrypt.compare(password, user.password)))
      throw Error("Authentication Error");

    let sessionQuery = await connection.query(
      `SELECT *
       FROM sessions
       WHERE user_id = $1`,
      [user.id]
    );

    if (!sessionQuery.rowCount) {
      let date = new Date();

      sessionQuery = await connection.query(
        `INSERT INTO
        sessions (user_id, created_at)
        VALUES
        ($1, $2)
        RETURNING id`,
        [user.id, date]
      );
    }

    const privateKey = process.env.JWT_SECRET;
    const config = { expiresIn: 60 * 60 * 24 * 7 }; // expires in 1 week

    const token = jwt.sign({ id: sessionQuery.rows[0].id }, privateKey, config);

    const userResponse = { username: user.name, email: user.email };

    return res.status(200).send({ user: userResponse, token });
  } catch (error) {
    if (error.message === "Authentication Error") return res.sendStatus(401);
    return res.status(400).send(error);
  }

async function verifyToken(req, res) {
  const authorization = req.headers["authorization"];
  const token = authorization.split("Bearer ")[1];

  const repository = getRepository(Session);
  const session = await repository.findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }
}
