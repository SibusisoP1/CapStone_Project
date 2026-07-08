"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnviromentVariables = getEnviromentVariables;
const enviroment_dev_1 = require("./enviroment.dev");
const enviroment_prod_1 = require("./enviroment.prod");
function getEnviromentVariables() {
    const isProduction = process.env.NODE_ENV === "production";
    const dbUri = process.env.db_uri ||
        process.env.DB_URI ||
        process.env.MONGODB_URI ||
        (isProduction ? enviroment_prod_1.ProdEnviroment.db_uri : enviroment_dev_1.DevEnviroment.db_uri);
    const jwtSecretKey = process.env.jwt_secret_key ||
        process.env.JWT_SECRET_KEY ||
        process.env.JWT_SECRET ||
        (isProduction ? enviroment_prod_1.ProdEnviroment.jwt_secret_key : enviroment_dev_1.DevEnviroment.jwt_secret_key);
    return {
        db_uri: dbUri,
        jwt_secret_key: jwtSecretKey,
    };
}
