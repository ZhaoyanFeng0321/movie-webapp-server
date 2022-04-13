/**
 * @file Implements mongoose model to CRUD
 * documents in the reviews collection
 */
import mongoose from "mongoose";
import ReviewSchema from "./ReviewSchema";

const ReviewModel = mongoose.model('ReviewModel', ReviewSchema);

export default ReviewModel;
