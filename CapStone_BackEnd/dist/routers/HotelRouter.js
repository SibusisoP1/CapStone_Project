"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HotelController_1 = require("../controllers/HotelController");
const HotelValidators_1 = require("../validators/HotelValidators");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const Utils_1 = require("../utils/Utils");
class HotelRouter {
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
        this.router.get("/hotels", HotelController_1.HotelController.getHotels);
        this.router.get("/hotels/:id", HotelValidators_1.HotelValidators.getHotel(), HotelController_1.HotelController.getHotel);
    }
    postRoutes() {
        this.router.post("/create", GlobalMiddleWare_1.GlobalMiddleWare.auth, GlobalMiddleWare_1.GlobalMiddleWare.adminRole, new Utils_1.Utils().multer.fields([
            { name: "img", maxCount: 1 },
            { name: "image", maxCount: 1 },
            { name: "file", maxCount: 1 },
        ]), HotelValidators_1.HotelValidators.addHotel(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, HotelController_1.HotelController.addHotel);
    }
    patchRoutes() {
        this.router.patch("/hotels/:id", GlobalMiddleWare_1.GlobalMiddleWare.auth, GlobalMiddleWare_1.GlobalMiddleWare.adminRole, new Utils_1.Utils().multer.fields([
            { name: "img", maxCount: 1 },
            { name: "image", maxCount: 1 },
            { name: "file", maxCount: 1 },
        ]), HotelValidators_1.HotelValidators.updateHotel(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, HotelController_1.HotelController.updateHotel);
    }
    putRoutes() {
        this.router.put("/hotels/:id", GlobalMiddleWare_1.GlobalMiddleWare.auth, GlobalMiddleWare_1.GlobalMiddleWare.adminRole, new Utils_1.Utils().multer.fields([
            { name: "img", maxCount: 1 },
            { name: "image", maxCount: 1 },
            { name: "file", maxCount: 1 },
        ]), HotelValidators_1.HotelValidators.updateHotel(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, HotelController_1.HotelController.updateHotel);
    }
    deleteRoutes() {
        this.router.delete("/hotels/:id", GlobalMiddleWare_1.GlobalMiddleWare.auth, GlobalMiddleWare_1.GlobalMiddleWare.adminRole, HotelController_1.HotelController.deleteHotel);
    }
}
exports.default = new HotelRouter().router;
