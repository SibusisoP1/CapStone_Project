"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelController = void 0;
const Hotel_1 = __importDefault(require("../models/Hotel"));
class HotelController {
    static async addHotel(req, res) {
        const hotel_data = req.body;
        const uploadedFile = req.file ||
            req.files?.img?.[0] ||
            req.files?.image?.[0] ||
            req.files?.file?.[0];
        const imageValue = hotel_data.img || hotel_data.image || hotel_data.file;
        const path = uploadedFile
            ? `/src/uploads/${uploadedFile.filename}`
            : imageValue;
        try {
            const data = {
                name: hotel_data.name,
                location: hotel_data.location,
                description: hotel_data.description,
                price: parseInt(hotel_data.price),
                guest: parseInt(hotel_data.guest),
                bedroom: parseInt(hotel_data.bedroom),
                bathroom: parseInt(hotel_data.bathroom),
                amneties: JSON.parse(hotel_data.amneties),
                type: hotel_data.type,
                img: path,
            };
            const hotel = await new Hotel_1.default(data).save();
            res.send(hotel);
        }
        catch (err) {
            res.send(err);
        }
    }
    static async getHotels(req, res, next) {
        try {
            const hotels = await Hotel_1.default.find({}).sort({
                updated_at: -1,
                created_at: -1,
            });
            res.send(hotels);
        }
        catch (err) {
            next(err);
        }
    }
    static async getHotel(req, res, next) {
        const hotel = req.hotel;
        const hotel_id = hotel._id;
        try {
            const hotelData = await Hotel_1.default.findById(hotel_id);
            res.json(hotelData);
        }
        catch (err) {
            next(err);
        }
    }
    static async deleteHotel(req, res, next) {
        const hotel_id = req.params.id;
        if (!hotel_id) {
            req.errorStatus = 400;
            return next(new Error("Hotel id is required"));
        }
        try {
            const hotel = await Hotel_1.default.findByIdAndDelete(hotel_id);
            if (!hotel) {
                req.errorStatus = 404;
                return next(new Error("Hotel not found"));
            }
            res.json({ message: "Hotel deleted", hotel });
        }
        catch (err) {
            next(err);
        }
    }
    static async updateHotel(req, res, next) {
        const hotel_id = req.params.id;
        const hotel_data = req.body;
        const uploadedFile = req.file ||
            req.files?.img?.[0] ||
            req.files?.image?.[0] ||
            req.files?.file?.[0];
        const imageValue = hotel_data.img || hotel_data.image || hotel_data.file;
        const path = uploadedFile
            ? `/src/uploads/${uploadedFile.filename}`
            : imageValue;
        if (!hotel_id) {
            req.errorStatus = 400;
            return next(new Error("Hotel id is required"));
        }
        try {
            const updateData = {};
            if (hotel_data.name !== undefined) {
                updateData.name = hotel_data.name;
            }
            if (hotel_data.location !== undefined) {
                updateData.location = hotel_data.location;
            }
            if (hotel_data.description !== undefined) {
                updateData.description = hotel_data.description;
            }
            if (hotel_data.price !== undefined && hotel_data.price !== "") {
                updateData.price = parseInt(hotel_data.price, 10);
            }
            if (hotel_data.guest !== undefined && hotel_data.guest !== "") {
                updateData.guest = parseInt(hotel_data.guest, 10);
            }
            if (hotel_data.bedroom !== undefined && hotel_data.bedroom !== "") {
                updateData.bedroom = parseInt(hotel_data.bedroom, 10);
            }
            if (hotel_data.bathroom !== undefined && hotel_data.bathroom !== "") {
                updateData.bathroom = parseInt(hotel_data.bathroom, 10);
            }
            if (hotel_data.type !== undefined) {
                updateData.type = hotel_data.type;
            }
            if (hotel_data.amneties !== undefined) {
                updateData.amneties =
                    typeof hotel_data.amneties === "string"
                        ? JSON.parse(hotel_data.amneties)
                        : hotel_data.amneties;
            }
            if (path) {
                updateData.img = path;
            }
            if (Object.keys(updateData).length === 0) {
                req.errorStatus = 400;
                return next(new Error("No fields provided for update"));
            }
            updateData.updated_at = new Date();
            const hotel = await Hotel_1.default.findByIdAndUpdate(hotel_id, updateData, {
                new: true,
            });
            if (!hotel) {
                req.errorStatus = 404;
                return next(new Error("Hotel not found"));
            }
            res.json({ message: "Hotel updated", hotel });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.HotelController = HotelController;
