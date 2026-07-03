import Hotel from "../models/Hotel";

export class HotelController {
  static async addHotel(req: any, res: any) {
    const hotel_data = req.body;
    const uploadedFile =
      req.file ||
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

      const hotel = await new Hotel(data).save();
      res.send(hotel);
    } catch (err) {
      res.send(err);
    }
  }

  static async getHotels(req: any, res: any, next: any) {
    try {
      const hotels = await Hotel.find({});
      res.send(hotels);
    } catch (err) {
      next(err);
    }
  }

  static async getHotel(req: any, res: any, next: any) {
    const hotel = req.hotel;
    const hotel_id = hotel._id;

    try {
      const hotelData = await Hotel.findById({ _id: hotel_id });
      res.json(hotelData);
    } catch (err) {
      next(err);
    }
  }

  static async deleteHotel(req: any, res: any, next: any) {
    const hotel_id = req.params.id;

    if (!hotel_id) {
      req.errorStatus = 400;
      return next(new Error("Hotel id is required"));
    }

    try {
      const hotel = await Hotel.findByIdAndDelete(hotel_id);

      if (!hotel) {
        req.errorStatus = 404;
        return next(new Error("Hotel not found"));
      }

      res.json({ message: "Hotel deleted", hotel });
    } catch (err) {
      next(err);
    }
  }

  static async updateHotel(req: any, res: any, next: any) {
    const hotel_id = req.params.id;
    const hotel_data = req.body;
    const uploadedFile =
      req.file ||
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
      const updateData: any = {
        name: hotel_data.name,
        location: hotel_data.location,
        description: hotel_data.description,
        price: parseInt(hotel_data.price),
        guest: parseInt(hotel_data.guest),
        bedroom: parseInt(hotel_data.bedroom),
        bathroom: parseInt(hotel_data.bathroom),
        type: hotel_data.type,
        updated_at: new Date(),
      };

      if (hotel_data.amneties) {
        updateData.amneties = JSON.parse(hotel_data.amneties);
      }

      if (path) {
        updateData.img = path;
      }

      const hotel = await Hotel.findByIdAndUpdate(hotel_id, updateData, {
        new: true,
      });

      if (!hotel) {
        req.errorStatus = 404;
        return next(new Error("Hotel not found"));
      }

      res.json({ message: "Hotel updated", hotel });
    } catch (err) {
      next(err);
    }
  }
}
