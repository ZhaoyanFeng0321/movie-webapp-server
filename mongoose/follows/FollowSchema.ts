/**
 * @file Implements mongoose schema for follows
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

/**
 * @typedef Follow Represents follow relationship in Tuiter
 * @property {ObjectId} userFollowed the User Id who is followed by another user
 * @property {ObjectId} userFollowing the User Id who is following another user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "follows"});

export default FollowSchema;