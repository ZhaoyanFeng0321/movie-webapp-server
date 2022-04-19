/**
 * @file Implements mongoose schema for reviews
 */
import mongoose, {Schema} from "mongoose";
import Review from "../../models/reviews/Review";

/**
 * @typedef Review Represents reviews
 * @property {string} review the content of review
 * @property {ObjectId} postedBy the User Id who post the review
 * @property {date} postedOn the post time of review
 */
const ReviewSchema = new mongoose.Schema<Review>({
    review: {type: String, default: ""},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    to: {type: Schema.Types.ObjectId, ref: "MovieModel"},
    postedOn: {type: Date, default: Date.now},
    stats: {
        replies: {type: Number, default: 0},
        repost: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes: {type: Number, default: 0}
    },
    rating: {type: Number, default: 0}
}, {collection: 'reviews'});

export default ReviewSchema;