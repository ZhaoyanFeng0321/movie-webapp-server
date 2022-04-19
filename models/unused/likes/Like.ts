/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user likes a tuit
 */

import Review from "../../reviews/Review";
import User from "../../users/User";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {Review} tuit Tuit being liked
 * @property {User} likedBy User liking the tuit
 */
export default interface Like{
    review: Review,
    likedBy: User
};