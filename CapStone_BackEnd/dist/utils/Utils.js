"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const enviroment_1 = require("../enviroments/enviroment");
const jwt = __importStar(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const uploadDirectory = path.resolve(__dirname, "..", "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });
const destinationOptions = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Only JPEG and PNG files are allowed"), false);
    }
};
class Utils {
    multer = (0, multer_1.default)({
        storage: destinationOptions,
        fileFilter: fileFilter,
    });
    static jwtSign(payload) {
        return jwt.sign(payload, (0, enviroment_1.getEnviromentVariables)().jwt_secret_key, {
            expiresIn: "180d",
        });
    }
    static jwtVerify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, (0, enviroment_1.getEnviromentVariables)().jwt_secret_key, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else if (!decoded) {
                    reject(new Error("User is not authorized"));
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.Utils = Utils;
