/**
 * @file Implements mongoose schema for dislikes
 */
import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/unused/dislikes/Dislike";

/**
 * @typedef Dislike Represents users dislike tuits
 * @property {ObjectId} tuit the id of Tuit
 * @property {ObjectId} dislikeBy the id of User
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type:Schema.Types.ObjectId,ref:"TuitModel"},
    dislikedBy:{type:Schema.Types.ObjectId,ref:"UserModel"}
},{collection:"dislikes"});

export default DislikeSchema;