/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */

import Movie from "../movies/Movie";
import User from "../users/User";

/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a movie,
 * as in a user bookmarks a tuit
 * @property {Review} bookmarkedTuit Tuit being bookmarked
 * @property {User} bookmarkedBy User bookmarking the tuit
 */

export default interface Bookmark{
    movie: Movie,
    bookmarkedBy: User
};