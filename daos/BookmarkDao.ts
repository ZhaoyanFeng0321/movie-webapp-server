import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao == null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;

    }

    private constructor() {
    }

    findAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find();

    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedTuit: tid})
            .populate("bookmarkedBy")
            .exec();

    findAllTuitsThatUserBookmarked = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy:uid}).
            populate("bookmarkedTuit")
            .exec();

    userBookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedTuit:tid,bookmarkedBy:uid});

    userUnbookmarksTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit:tid,bookmarkedBy:uid});




}

