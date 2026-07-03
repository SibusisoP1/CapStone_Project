"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserValidators_1 = require("../validators/UserValidators");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
class UserRouter {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.putRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/login", UserValidators_1.UserValidators.login(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.login);
    }
    postRoutes() {
        this.router.post("/signup", UserValidators_1.UserValidators.signup(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, UserController_1.UserController.signup);
    }
    patchRoutes() { }
    putRoutes() { }
    deleteRoutes() { }
}
exports.default = new UserRouter().router;
