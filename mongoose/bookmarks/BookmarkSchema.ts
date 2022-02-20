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

    bookmarkedTuit: {type: Schema.Types.ObjectId,ref:"TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId,ref:"UserModel"}
},{collection:"bookmarks"});

export default BookmarkSchema;