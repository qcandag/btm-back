import { ObjectId } from "mongoose";

export interface JwtPayload {
    phone: string;
    _id: ObjectId
}