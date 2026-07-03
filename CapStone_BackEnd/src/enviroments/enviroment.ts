import { DevEnviroment } from "./enviroment.dev";
import { ProdEnviroment } from "./enviroment.prod";

export interface Enviroment {
  db_uri: string;
  jwt_secret_key: string;
}

export function getEnviromentVariables() {
   const isProduction = process.env.NODE_ENV === "production";
  const dbUri =
    process.env.db_uri ||
    process.env.DB_URI ||
    process.env.MONGODB_URI ||
    (isProduction ? ProdEnviroment.db_uri : DevEnviroment.db_uri);
  const jwtSecretKey =
    process.env.jwt_secret_key ||
    process.env.JWT_SECRET_KEY ||
    process.env.JWT_SECRET ||
    (isProduction ? ProdEnviroment.jwt_secret_key : DevEnviroment.jwt_secret_key);

  return {
    db_uri: dbUri,
    jwt_secret_key: jwtSecretKey,
  };
}
