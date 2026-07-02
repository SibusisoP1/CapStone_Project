import { body } from "express-validator";
import Hotel from "../models/Hotel";

export class ReservationValidators {
  static reserve() {
    return [
      body("hotel_id", "Hotel ID is Required")
        .notEmpty()
        .isMongoId()
        .custom((hotel_id, { req }) => {
          return Hotel.findById(hotel_id)
            .then((hotel) => {
              if (hotel) {
                return true;
              } else {
                throw new Error("Hotel not found");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }),
      body("checkin", "Check-in date is required")
        .notEmpty()
        .isISO8601()
        .withMessage("Check-in date must be a valid date"),
      body("checkout", "Check-out date is required")
        .notEmpty()
        .isISO8601()
        .withMessage("Check-out date must be a valid date")
        .custom((checkout, { req }) => {
          const checkin = req.body.checkin;
          if (checkin && new Date(checkout) <= new Date(checkin)) {
            throw new Error("Check-out date must be after check-in date");
          }
          return true;
        }),
    ];
  }
}
