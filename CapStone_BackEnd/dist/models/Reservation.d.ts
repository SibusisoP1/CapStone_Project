import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, {
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username: string;
    hotel_id: mongoose.Types.ObjectId;
    checkin: NativeDate;
    checkout: NativeDate;
    user_id: mongoose.Types.ObjectId;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
