import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

const BookmarkModel = mongoose.model("BookmarkModel",BookmarkSchema);

export default BookmarkModel;