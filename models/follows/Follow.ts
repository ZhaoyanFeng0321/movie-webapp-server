/**
 * @file Follow data model
 */

import User from "../users/User";

export default interface Follow{
    userFollowed: User,
    userFollowing: User
};
