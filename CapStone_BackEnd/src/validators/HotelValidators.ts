import { body, param } from "express-validator";
import Hotel from "../models/Hotel";

export class HotelValidators {
  static addHotel() {
    return [
      body("img", "Image is Required").custom((value, { req }) => {
        const uploadedFile =
          req.file ||
          req.files?.img?.[0] ||
          req.files?.image?.[0] ||
          req.files?.file?.[0];
        const bodyImage = req.body?.img || req.body?.image || req.body?.file;

        if (!uploadedFile && !bodyImage) {
          throw new Error("Image is Required");
        }

        return true;
      }),
      body("name", "Name is Required").notEmpty(),
      body("location", "Location is Required").notEmpty(),
      body("description", "Description is Required").notEmpty(),
      body("price", "Price is Required")
        .isString()
        .withMessage("Price must be a number"),
      body("guest", "Guest is Required")
        .isString()
        .withMessage("Guest must be a number"),
      body("bedroom", "Bedroom is Required")
        .isString()
        .withMessage("Bedroom must be a number"),
      body("bathroom", "Bathroom is Required")
        .isString()
        .withMessage("Bathroom must be a number"),
      body("amneties", "Amenities are Required").isString(),
      body("type", "Type is Required").notEmpty(),
    ];
  }
  static getHotel() {
    return [
      param("id", "Hotel ID is Required")
        .notEmpty()
        .isMongoId()
        .custom((id, { req }) => {
          return Hotel.findById(id)
            .then((hotel) => {
              if (hotel) {
                req.hotel = hotel;
                return true;
              } else {
                throw new Error("Hotel not found");
              }
            })
            .catch((err) => {
              throw new Error(err);
            });
        }),
    ];
  }
}
