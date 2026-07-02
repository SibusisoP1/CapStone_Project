import { body, query } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static signup() {
    return [
      body("username", "Username is Required")
        .isString()
        .custom((username, { req }) => {
          return User.findOne({ username: username }).then((user) => {
            if (user) {
              return Promise.reject("Username already exists");
            }
          });
        }),
      body("password", "Password is Required")
        .isAlphanumeric()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      body("role", "Role is Required").isString(),
    ];
  }

  static login() {
    return [
      query("username", "Username is Required")
        .isString()
        .custom((username, { req }) => {
          return User.findOne({ username: username }).then((user) => {
            req.user = user;
            if (!user) {
              throw new Error("Invalid username or password");
            }
          });
        }),
      query("password", "Password is Required")
        .isAlphanumeric()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    ];
  }
}
