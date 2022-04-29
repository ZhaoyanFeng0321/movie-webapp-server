/**
 * @file Declares Follow data type representing relationship between
 * users and users, as in user follow another user
 */


import User from "../users/User";

/**
 * @typedef Follow Represents follow relationship between a user and a user,
 * as in a user follow a user
 * @property {User} userFollowed the User who is followed by
 * @property {User} userFollowing the User Id who is following
 */
export default interface Follow{
    userFollowed: string,
    userFollowing: string
};
