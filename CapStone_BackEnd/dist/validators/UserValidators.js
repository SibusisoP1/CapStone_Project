"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidators = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
class UserValidators {
    static signup() {
        return [
            (0, express_validator_1.body)("username", "Username is Required")
                .isString()
                .custom((username, { req }) => {
                return User_1.default.findOne({ username: username }).then((user) => {
                    if (user) {
                        return Promise.reject("Username already exists");
                    }
                });
            }),
            (0, express_validator_1.body)("password", "Password is Required")
                .isAlphanumeric()
                .isLength({ min: 6 })
                .withMessage("Password must be at least 6 characters long"),
            (0, express_validator_1.body)("role", "Role is Required").isString(),
        ];
    }
    static login() {
        return [
            (0, express_validator_1.query)("username", "Username is Required")
                .isString()
                .custom((username, { req }) => {
                return User_1.default.findOne({ username: username }).then((user) => {
                    req.user = user;
                    if (!user) {
                        throw new Error("Invalid username or password");
                    }
                });
            }),
            (0, express_validator_1.query)("password", "Password is Required")
                .isAlphanumeric()
                .isLength({ min: 6 })
                .withMessage("Password must be at least 6 characters long"),
        ];
    }
}
exports.UserValidators = UserValidators;
