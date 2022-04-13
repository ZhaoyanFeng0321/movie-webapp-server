/**
 * @file User data model
 */
// import MaritalStatus from "./MaritalStatus";
import mongoose from "mongoose";
import User from "../users/User";

/**
 * @typedef Movie Represents movie
 * @property {ObjectId} _id the unique id of movie
 * @property {string} title the name of movie
 * @property {string} poster the poster source of movie
 * @property {date} released the time of movie released
 * @property {number} length the length of movie
 * @property {number} rating the length of movie
 */
export default interface Movie {
    _id?: mongoose.Schema.Types.ObjectId;
    title: string;
    imdbID: string;
    poster?: string;
    // length: number;
    // director: string;
    // released: Date;
    rating?: number;
    likes?: number;
    dislikes?: number;
}