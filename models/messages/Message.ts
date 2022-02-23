/**
 * @file Declares Message data type representing relationship between
 * users and users, as in user send messages to another user
 */

import User from "../users/User";

/**
 * @typedef Like Represents messages relationship between a user and a user,
 * as in a user send message to a user
 * @property {string} message the content of message
 * @property {User} to User sending the message
 * @property {User} from User receiveing the message
 * @property {date} sentOn the time of sending
 */
export default interface Message{
    message: string,
    to: User,
    from: User,
    sentOn: Date
};