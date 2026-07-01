import { body } from "express-validator";

export class UserValidators {
  static signup() {
    return [
      body("username", "Username is Required").isString(),
      body("password", "Password is Required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      body("role", "Role is Required").isString(),
    ];
  }
}
