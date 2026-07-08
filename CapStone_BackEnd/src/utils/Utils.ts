import { getEnviromentVariables } from "../enviroments/enviroment";
import * as jwt from "jsonwebtoken";
import Multer from "multer";
import * as fs from "fs";
import * as path from "path";

const uploadDirectory = path.resolve(process.cwd(), "src", "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const destinationOptions = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG and PNG files are allowed"), false);
  }
};

export class Utils {
  public multer = Multer({
    storage: destinationOptions,
    fileFilter: fileFilter,
  });

  static jwtSign(payload: any): string {
    return jwt.sign(payload, getEnviromentVariables().jwt_secret_key, {
      expiresIn: "180d",
    });
  }

  static jwtVerify(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        getEnviromentVariables().jwt_secret_key,
        (err, decoded) => {
          if (err) {
            reject(err);
          } else if (!decoded) {
            reject(new Error("User is not authorized"));
          } else {
            resolve(decoded);
          }
        },
      );
    });
  }
}
