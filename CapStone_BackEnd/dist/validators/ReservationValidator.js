"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationValidators = void 0;
const express_validator_1 = require("express-validator");
const Hotel_1 = __importDefault(require("../models/Hotel"));
class ReservationValidators {
    static reserve() {
        return [
            (0, express_validator_1.body)("hotel_id", "Hotel ID is Required")
                .notEmpty()
                .isMongoId()
                .custom((hotel_id, { req }) => {
                return Hotel_1.default.findById(hotel_id)
                    .then((hotel) => {
                    if (hotel) {
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
            (0, express_validator_1.body)("checkin", "Check-in date is required")
                .notEmpty()
                .isISO8601()
                .withMessage("Check-in date must be a valid date"),
            (0, express_validator_1.body)("checkout", "Check-out date is required")
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
exports.ReservationValidators = ReservationValidators;
