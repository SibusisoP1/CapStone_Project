import User from "../models/User";
import { body, validationResult } from "express-validator";

export class UserController {
  static signup(req: any, res: any, next: any) {
    const errors = validationResult(req);

    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    if (!errors.isEmpty()) {
      return next(new Error(errors.array()[0].msg));
    }

    const data = {
      username: username,
      password: password,
      role: role,
    };

    const user = new User(data);

    user
      .save()
      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        next(error);
      });
  }
}
