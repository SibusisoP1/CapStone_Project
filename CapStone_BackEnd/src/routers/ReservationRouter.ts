import { Router } from "express";
import { body, validationResult } from "express-validator";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { ReservationValidators } from "../validators/ReservationValidator";
import { ReservationController } from "../controllers/ReservationController";

class ReservationRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/reservations",
      GlobalMiddleWare.auth,
      ReservationController.getReservations,
    );

    this.router.get(
      "/AllReservations",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      ReservationController.getAllReservations,
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      ReservationValidators.reserve(),
      GlobalMiddleWare.checkError,
      ReservationController.reserve,
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {
    this.router.delete(
      "/reservations/:id",
      GlobalMiddleWare.auth,
      ReservationController.deleteReservation,
    );
  }
}

export default new ReservationRouter().router;
