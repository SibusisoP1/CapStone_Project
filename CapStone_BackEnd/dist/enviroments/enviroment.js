"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnviromentVariables = getEnviromentVariables;
const enviroment_dev_1 = require("./enviroment.dev");
const enviroment_prod_1 = require("./enviroment.prod");
function getEnviromentVariables() {
    if (process.env.NODE_ENV === "production") {
        return enviroment_prod_1.ProdEnviroment;
    }
    return enviroment_dev_1.DevEnviroment;
}
