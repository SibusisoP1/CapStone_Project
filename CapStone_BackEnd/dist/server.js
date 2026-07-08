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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const bodyParser = __importStar(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path = __importStar(require("path"));
const enviroment_1 = require("./enviroments/enviroment");
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const HotelRouter_1 = __importDefault(require("./routers/HotelRouter"));
const ReservationRouter_1 = __importDefault(require("./routers/ReservationRouter"));
class Server {
    app = (0, express_1.default)();
    constructor() {
        this.setConfigs();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigs() {
        this.connectMongoDB();
        this.allowCors();
        this.configureBodyParser();
    }
    configureBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    allowCors() {
        this.app.use((0, cors_1.default)());
    }
    connectMongoDB() {
        mongoose.connect((0, enviroment_1.getEnviromentVariables)().db_uri).then(() => {
            console.log("Connected to MongoDb");
        });
    }
    setRoutes() {
        const uploadDirectory = path.resolve(process.cwd(), "src", "uploads");
        this.app.use("/src/uploads", express_1.default.static(uploadDirectory));
        this.app.use("/api/user", UserRouter_1.default);
        this.app.use("/api/hotel", HotelRouter_1.default);
        this.app.use("/api/reservation", ReservationRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({ message: "Route not found", status_code: 404 });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || "something",
                status_code: errorStatus,
            });
        });
    }
}
exports.Server = Server;
