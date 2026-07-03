"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelValidators = void 0;
const express_validator_1 = require("express-validator");
const Hotel_1 = __importDefault(require("../models/Hotel"));
class HotelValidators {
    static addHotel() {
        return [
            (0, express_validator_1.body)("img", "Image is Required").custom((value, { req }) => {
                const uploadedFile = req.file ||
                    req.files?.img?.[0] ||
                    req.files?.image?.[0] ||
                    req.files?.file?.[0];
                const bodyImage = req.body?.img || req.body?.image || req.body?.file;
                if (!uploadedFile && !bodyImage) {
                    throw new Error("Image is Required");
                }
                return true;
            }),
            (0, express_validator_1.body)("name", "Name is Required").notEmpty(),
            (0, express_validator_1.body)("location", "Location is Required").notEmpty(),
            (0, express_validator_1.body)("description", "Description is Required").notEmpty(),
            (0, express_validator_1.body)("price", "Price is Required")
                .isString()
                .withMessage("Price must be a number"),
            (0, express_validator_1.body)("guest", "Guest is Required")
                .isString()
                .withMessage("Guest must be a number"),
            (0, express_validator_1.body)("bedroom", "Bedroom is Required")
                .isString()
                .withMessage("Bedroom must be a number"),
            (0, express_validator_1.body)("bathroom", "Bathroom is Required")
                .isString()
                .withMessage("Bathroom must be a number"),
            (0, express_validator_1.body)("amneties", "Amenities are Required").isString(),
            (0, express_validator_1.body)("type", "Type is Required").notEmpty(),
        ];
    }
    static updateHotel() {
        return [
            (0, express_validator_1.body)("name", "Name must not be empty").optional().notEmpty(),
            (0, express_validator_1.body)("location", "Location must not be empty").optional().notEmpty(),
            (0, express_validator_1.body)("description").optional(),
            (0, express_validator_1.body)("price", "Price must be a number")
                .optional()
                .custom((value) => {
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                if (typeof value === "number" || typeof value === "string") {
                    return true;
                }
                throw new Error("Price must be a number");
            }),
            (0, express_validator_1.body)("guest", "Guest must be a number")
                .optional()
                .custom((value) => {
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                if (typeof value === "number" || typeof value === "string") {
                    return true;
                }
                throw new Error("Guest must be a number");
            }),
            (0, express_validator_1.body)("bedroom", "Bedroom must be a number")
                .optional()
                .custom((value) => {
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                if (typeof value === "number" || typeof value === "string") {
                    return true;
                }
                throw new Error("Bedroom must be a number");
            }),
            (0, express_validator_1.body)("bathroom", "Bathroom must be a number")
                .optional()
                .custom((value) => {
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                if (typeof value === "number" || typeof value === "string") {
                    return true;
                }
                throw new Error("Bathroom must be a number");
            }),
            (0, express_validator_1.body)("amneties", "Amenities must be a string").optional().isString(),
            (0, express_validator_1.body)("type", "Type must not be empty").optional().notEmpty(),
        ];
    }
    static getHotel() {
        return [
            (0, express_validator_1.param)("id", "Hotel ID is Required")
                .notEmpty()
                .isMongoId()
                .custom((id, { req }) => {
                return Hotel_1.default.findById(id)
                    .then((hotel) => {
                    if (hotel) {
                        req.hotel = hotel;
                        return true;
                    }
                    else {
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
exports.HotelValidators = HotelValidators;
