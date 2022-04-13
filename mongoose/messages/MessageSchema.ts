// /**
//  * @file Implements mongoose schema for messages
//  */
// import mongoose,{Schema} from "mongoose";
// import Message from "../../models/messages/Message";
//
// /**
//  * @typedef Message represent message in Tuiter
//  * @property {string} message the content of message
//  * @property {ObjectId} to the User Id who received message
//  * @property {ObjectId} from the User Id who sent message
//  * @property {date} sentOn the sent time of message
//  */
// const MessageSchema = new mongoose.Schema<Message>({
//     message: {type: String, required: true},
//     to: {type: Schema.Types.ObjectId, ref: "UserModel"},
//     from: {type: Schema.Types.ObjectId, ref: "UserModel"},
//     sentOn: {type: Date, default: Date.now},
// },{collection:"messages"});
//
// export default MessageSchema;