"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Utils_1 = require("../utils/Utils");
class UserController {
    static async signup(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;
        const role = req.body.role;
        try {
            const data = {
                username: username,
                password: password,
                role: role,
            };
            const user = await new User_1.default(data).save();
            const payload = {
                user_id: user._id,
                username: user.username,
                role: user.role,
            };
            const token = Utils_1.Utils.jwtSign(payload);
            res.json({ user, token });
        }
        catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        const user = req.user;
        const username = req.query.username;
        const password = req.query.password;
        const userPassword = req.user.password;
        try {
            if (userPassword !== password) {
                throw new Error("Invalid username or password");
            }
            const payload = {
                user_id: user._id,
                username: username,
                role: user.role,
            };
            const token = Utils_1.Utils.jwtSign(payload);
            res.json({ user, token });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.UserController = UserController;
