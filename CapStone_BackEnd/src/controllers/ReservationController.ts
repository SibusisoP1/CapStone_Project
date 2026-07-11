import Reservation from "../models/Reservation";

export class ReservationController {
  static async reserve(req: any, res: any, next: any) {
    const data = req.body;
    const user_id =
      req.user?.user_id ||
      req.decoded?.user_id ||
      req.user?._id ||
      req.decoded?._id ||
      data.user_id;
    const username = req.user?.username || req.decoded?.username || null;

    try {
      const Reservedata = {
        user_id: user_id,
        username: username,
        hotel_id: data.hotel_id,
        checkin: new Date(data.checkin),
        checkout: new Date(data.checkout),
      };

      const reservationDoc: any = await new Reservation(Reservedata).save();
      await reservationDoc.populate("hotel_id", "name");

      const response_reservation = {
        reservation_id: reservationDoc._id,
        user_id: reservationDoc.user_id,
        username: reservationDoc.username,
        hotel_id: reservationDoc.hotel_id?._id || reservationDoc.hotel_id,
        hotel_name: reservationDoc.hotel_id?.name || null,
        checkin: reservationDoc.checkin,
        checkout: reservationDoc.checkout,
      };

      res.send(response_reservation);
    } catch (err) {
      next(err);
    }
  }

  static async getReservations(req: any, res: any, next: any) {
    const user_id =
      req.user?.user_id ||
      req.decoded?.user_id ||
      req.user?._id ||
      req.decoded?._id;

    try {
      const reservations = await Reservation.find({ user_id: user_id }).populate(
        "hotel_id",
        "name",
      );
      res.send(reservations);
    } catch (err) {
      next(err);
    }
  }

  static async getAllReservations(req: any, res: any, next: any) {
    try {
      const reservations = await Reservation.find({}).populate(
        "hotel_id",
        "name",
      );
      res.send(reservations);
    } catch (err) {
      next(err);
    }
  }

  static async deleteReservation(req: any, res: any, next: any) {
    const reservation_id = req.params.id;
    const user_id =
      req.user?.user_id ||
      req.decoded?.user_id ||
      req.user?._id ||
      req.decoded?._id;

    if (!reservation_id) {
      req.errorStatus = 400;
      return next(new Error("Reservation id is required"));
    }

    try {
      const reservation = await Reservation.findById(reservation_id);

      if (!reservation) {
        req.errorStatus = 404;
        return next(new Error("Reservation not found"));
      }

      const isOwner =
        user_id && reservation.user_id?.toString() === user_id.toString();
      const isHost = req.user?.role === "host" || req.decoded?.role === "host";

      if (!isOwner && !isHost) {
        req.errorStatus = 401;
        return next(new Error("Unauthorized access"));
      }

      await Reservation.findByIdAndDelete(reservation_id);
      res.json({ message: "Reservation deleted", reservation });
    } catch (err) {
      next(err);
    }
  }

  static async updateReservation(req: any, res: any, next: any) {
    const reservation_id = req.params.id;
    const data = req.body;
    const user_id =
      req.user?.user_id ||
      req.decoded?.user_id ||
      req.user?._id ||
      req.decoded?._id;

    if (!reservation_id) {
      req.errorStatus = 400;
      return next(new Error("Reservation id is required"));
    }

    try {
      const reservation = await Reservation.findById(reservation_id);

      if (!reservation) {
        req.errorStatus = 404;
        return next(new Error("Reservation not found"));
      }

      const isOwner =
        user_id && reservation.user_id?.toString() === user_id.toString();
      const isHost = req.user?.role === "host" || req.decoded?.role === "host";

      if (!isOwner && !isHost) {
        req.errorStatus = 401;
        return next(new Error("Unauthorized access"));
      }

      reservation.checkin = new Date(data.checkin);
      reservation.checkout = new Date(data.checkout);

      const updatedDoc: any = await reservation.save();
      await updatedDoc.populate("hotel_id", "name");

      const response_reservation = {
        reservation_id: updatedDoc._id,
        user_id: updatedDoc.user_id,
        username: updatedDoc.username,
        hotel_id: updatedDoc.hotel_id?._id || updatedDoc.hotel_id,
        hotel_name: updatedDoc.hotel_id?.name || null,
        checkin: updatedDoc.checkin,
        checkout: updatedDoc.checkout,
      };

      res.json({ message: "Reservation updated", reservation: response_reservation });
    } catch (err) {
      next(err);
    }
  }
}
