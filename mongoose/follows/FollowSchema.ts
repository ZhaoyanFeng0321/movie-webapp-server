/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow Represents follow relationship in Tuiter
 * @property {ObjectId} userFollowed the User Id who is followed
 * @property {ObjectId} userFollowing the User Id who is following
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: String, default : ""},
    userFollowing: {type: String, default: ""},

}, {collection: "follows"});

export default FollowSchema;