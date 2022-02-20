/**
 * @file Bookmark data model
 */

import Tuit from "../tuits/Tuit";
import User from "../users/User";

export default interface Bookmark{
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};