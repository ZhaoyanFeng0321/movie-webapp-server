import Bookmark from "../../models/bookmarks/Bookmark";

export default interface BookmarkDaoI{
    findAllBookmarks():Promise<Bookmark[]>;

    findAllTuitsThatUserBookmarked(uid:string): Promise<Bookmark[]>;

    findAllUsersThatBookmarkedTuit(tid: string):Promise<Bookmark[]>;

    userBookmarksTuit(tid:string, uid:string): Promise<any>;

    userUnbookmarksTuit(tid:string,uid:string): Promise<any>;

}