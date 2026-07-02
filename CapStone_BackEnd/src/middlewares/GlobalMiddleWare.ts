import { validationResult } from "express-validator";
import { Utils } from "../utils/Utils";

export class GlobalMiddleWare {
  static checkError(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Error(errors.array()[0].msg));
    }
    next();
  }

  private static getToken(req: any): string | null {
    const headerAuth = req.headers.authorization || req.headers.Authorization;

    if (!headerAuth || typeof headerAuth !== "string") {
      return null;
    }

    const trimmedHeader = headerAuth.trim();

    if (!trimmedHeader) {
      return null;
    }

    if (trimmedHeader.toLowerCase().startsWith("bearer ")) {
      const token = trimmedHeader.slice(7).trim();
      return token || null;
    }

    return trimmedHeader;
  }

  static async auth(req: any, res: any, next: any) {
    const token = GlobalMiddleWare.getToken(req);

    if (!token) {
      req.errorStatus = 401;
      return next(new Error("Authentication token is missing"));
    }

    try {
      const coded = await Utils.jwtVerify(token);
      req.decoded = coded;
      req.user = coded;
      return next();
    } catch (err) {
      req.errorStatus = 401;
      return next(new Error("Invalid or expired authentication token"));
    }
  }

  static adminRole(req: any, res: any, next: any) {
    const user = req.user || req.decoded;

    if (!user || user.role !== "host") {
      req.errorStatus = 401;
      return next(new Error("Unauthorized access"));
    }

    return next();
  }
}
