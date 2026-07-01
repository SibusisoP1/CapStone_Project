import User from "../models/User";
import { body, validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";
import { getEnviromentVariables } from "../enviroments/enviroment";

export class UserController {
  static async signup(req: any, res: any, next: any) {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    try {
      const data = {
        username: username,
        password: password,
        role: role,
      };

      const user = await new User(data).save();
      const payload = {
        user_id: user._id,
        username: user.username,
        role: user.role,
      };
      const token = jwt.sign(payload, getEnviromentVariables().jwt_secret_key, {
        expiresIn: "180d",
      });

      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
}
