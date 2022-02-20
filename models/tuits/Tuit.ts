/**
 * @file Tuit data model
 */
import User from "../users/User";
import mongoose from "mongoose";

export default interface Tuit {
     _id?: mongoose.Schema.Types.ObjectId;
    tuit: string;
    postedBy?: User;
    postedOn: Date;

}