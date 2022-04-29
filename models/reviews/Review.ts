/**
 * @file Tuit data model
 */
import User from "../users/User";
import mongoose, {Schema, Types} from "mongoose";
import Stats from "./Stats";
import Movie from "../movies/Movie";



/**
 * @typedef Review Represents tuits posted on Tuiter
 * @property {string} review the content of tuit
 * @property {User} postedBy User posted the review
 * @property {Movie} reviewOn Movie get reviewed
 * @property {date} postedOn the post time of review
 */
export default interface Review {
     _id?: mongoose.Schema.Types.ObjectId;
    review?: string;
    from: string;
    to: string;
    postedOn: Date;
    rating?: number;
    stats: Stats;
}