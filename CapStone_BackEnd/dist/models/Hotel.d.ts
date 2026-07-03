import * as mongoose from "mongoose";
declare const _default: mongoose.Model<{
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
}, mongoose.Document<unknown, {}, {
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    type: string;
    name: string;
    img: string;
    location: string;
    price: number;
    guest: number;
    bedroom: number;
    bathroom: number;
    amneties: string[];
    status: number;
    created_at: NativeDate;
    updated_at: NativeDate;
    description?: string | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
