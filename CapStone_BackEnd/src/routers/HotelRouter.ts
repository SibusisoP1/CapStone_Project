import { Router } from "express";
import { HotelController } from "../controllers/HotelController";
import { body, validationResult } from "express-validator";
import { HotelValidators } from "../validators/HotelValidators";
import { GlobalMiddleWare } from "../middlewares/GlobalMiddleWare";
import { Utils } from "../utils/Utils";

class HotelRouter {
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
    this.router.get("/hotels", HotelController.getHotels);
    this.router.get(
      "/hotels/:id",
      HotelValidators.getHotel(),
      HotelController.getHotel,
    );
  }

  postRoutes() {
    this.router.post(
      "/create",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      new Utils().multer.fields([
        { name: "img", maxCount: 1 },
        { name: "image", maxCount: 1 },
        { name: "file", maxCount: 1 },
      ]),
      HotelValidators.addHotel(),
      GlobalMiddleWare.checkError,
      HotelController.addHotel,
    );
  }

  patchRoutes() {}

  putRoutes() {}

  deleteRoutes() {
    this.router.delete(
      "/hotels/:id",
      GlobalMiddleWare.auth,
      GlobalMiddleWare.adminRole,
      HotelController.deleteHotel,
    );
  }
}

export default new HotelRouter().router;
