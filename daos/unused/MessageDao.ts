// /**
//  * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
//  * to integrate with MongoDB
//  */
// import MessageDaoI from "../interfaces/messages/MessageDaoI";
// import MessageModel from "../mongoose/messages/MessageModel";
// import Message from "../models/messages/Message";
//
// /**
//  * @class MessageDao Implements Data Access Object managing data storage
//  * of Messages
//  * @property {MessageDao} messageDao private single instance of MessageDao
//  */
// export default class MessageDao implements MessageDaoI {
//
//     private static messageDao: MessageDao | null = null;
//
//     /**
//      * Creates singleton DAO instance
//      * @returns MessageDao
//      */
//     public static getInstance = (): MessageDao => {
//         if (MessageDao.messageDao === null) {
//             MessageDao.messageDao = new MessageDao();
//         }
//
//         return MessageDao.messageDao;
//     }
//
//     private constructor() {
//     }
//
//     /**
//      * Uses MessageModel to retrieve all messages document that specific user sent from messages collection
//      * @param {string} uid User's primary key
//      * @returns Promise To be notified when messages are retrieved from the database
//      */
//     findAllMessageUserSent = async (uid: string): Promise<Message[]> =>
//         MessageModel.find({from: uid});
//
//     /**
//      * Uses MessageModel to retrieve all messages document that specific user received from messages collection
//      * @param {string} uid User's primary key
//      * @returns Promise To be notified when messages are retrieved from the database
//      */
//     findAllMessageUserReceived = async (uid: string): Promise<Message[]> =>
//         MessageModel.find({to: uid});
//
//     /**
//      * Uses MessageModel to retrieve all messages document that specific user sent to another specific
//      * user from messages collection
//      * @param {string} uid1 User's primary key of sender
//      * @param {string} uid2 User's primary key of receiver
//      * @returns Promise To be notified when messages are retrieved from the database
//      */
//     findAllMessageUserSentToAnotherUser = async (uid1: string, uid2: string): Promise<Message[]> =>
//         MessageModel.find({from: uid1, to: uid2});
//
//     /**
//      * Inserts message instance into the database
//      * @param {string} uid1 User's primary key of sender
//      * @param {string} uid2 User's primary key of receive
//      * @param {Message} message Instance to be inserted into the database
//      * @returns Promise To be notified when message is inserted into the database
//      */
//     userSendsMessage = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
//         MessageModel.create({...message, from: uid1, to: uid2});
//
//     /**
//      * Removes message from the database
//      * @param {string} mid Primary key of message to be removed
//      * @returns Promise To be notified when message is removed from the database
//      */
//     userDeletesMessage = async (mid: string): Promise<any> =>
//         MessageModel.deleteOne({_id:mid});
//
//
//     /**
//      * Removes all messages from the database. Useful for testing
//      * @returns Promise To be notified when all messages are removed from the
//      * database
//      */
//     deleteAllMessages = async (): Promise<any> =>
//         MessageModel.deleteMany();
// }
//
