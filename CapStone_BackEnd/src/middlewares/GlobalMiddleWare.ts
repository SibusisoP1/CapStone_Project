import { validationResult } from "express-validator";

export class GlobalMiddleWare {
  static checkError(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Error(errors.array()[0].msg));
    }
  }
}
