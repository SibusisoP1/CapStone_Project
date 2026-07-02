import User from "../models/User";
import { body, validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";
import { getEnviromentVariables } from "../enviroments/enviroment";
import { Utils } from "../utils/Utils";

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
      const token = Utils.jwtSign(payload);

      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: any, res: any, next: any) {
    const user = req.user;
    const username = req.query.username;
    const password = req.query.password;
    const userPassword = req.user.password;

    try {
      if (userPassword !== password) {
        throw new Error("Invalid username or password");
      }
      const payload = {
        user_id: user._id,
        username: username,
        role: user.role,
      };
      const token = Utils.jwtSign(payload);

      res.json({ user, token });
    } catch (err) {
      next(err);
    }
  }
}
