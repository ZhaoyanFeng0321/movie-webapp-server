/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose,{Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents users bookmark tuits
 * @property {ObjectId} bookmarkedTuit the Tuit Id
 * @property {ObjectId} bookmarkedBy the User Id
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({

    movie: {type: Schema.Types.ObjectId,ref:"MovieModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId,ref:"UserModel"}
},{collection:"bookmarks"});

export default BookmarkSchema;