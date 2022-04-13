// /**
//  * @file Implements mongoose schema for likes
//  */
// import mongoose, {Schema} from "mongoose";
// import Like from "../../models/likes/Like";
//
// /**
//  * @typedef Like Represents users like tuits
//  * @property {ObjectId} tuit the id of Tuit
//  * @property {ObjectId} likeBy the id of User
//  */
// const LikeSchema = new mongoose.Schema<Like>({
//     tuit: {type:Schema.Types.ObjectId,ref:"TuitModel"},
//     likedBy:{type:Schema.Types.ObjectId,ref:"UserModel"}
// },{collection:"likes"});
//
// export default LikeSchema;