"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GlobalMiddleWare_1 = require("../middlewares/GlobalMiddleWare");
const ReservationValidator_1 = require("../validators/ReservationValidator");
const ReservationController_1 = require("../controllers/ReservationController");
class ReservationRouter {
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
        this.router.get("/reservations", GlobalMiddleWare_1.GlobalMiddleWare.auth, ReservationController_1.ReservationController.getReservations);
        this.router.get("/AllReservations", GlobalMiddleWare_1.GlobalMiddleWare.auth, GlobalMiddleWare_1.GlobalMiddleWare.adminRole, ReservationController_1.ReservationController.getAllReservations);
    }
    postRoutes() {
        this.router.post("/create", GlobalMiddleWare_1.GlobalMiddleWare.auth, ReservationValidator_1.ReservationValidators.reserve(), GlobalMiddleWare_1.GlobalMiddleWare.checkError, ReservationController_1.ReservationController.reserve);
    }
    patchRoutes() { }
    putRoutes() { }
    deleteRoutes() {
        this.router.delete("/reservations/:id", GlobalMiddleWare_1.GlobalMiddleWare.auth, ReservationController_1.ReservationController.deleteReservation);
    }
}
exports.default = new ReservationRouter().router;
