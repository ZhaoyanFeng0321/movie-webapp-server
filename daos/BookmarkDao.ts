/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkDaoI from "../interfaces/bookmarks/BookmarkDaoI";
import Movie from "../models/movies/Movie";
import MovieModel from "../mongoose/movies/MovieModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;

    }

    private constructor() {
    }

    /**
     * Uses BookmarkModel to retrieve all bookmarks documents from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find();

    /**
     * Uses BookmarkModel to retrieve all bookmarks documents with specific tuit from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllUsersThatBookmarkedMovie = async (mid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({movie: mid})
            .populate("bookmarkedBy")
            .exec();

    /**
     * Uses BookmarkModel to retrieve all bookmarks documents with specific user from bookmarks collection
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllMoviesThatUserBookmarked = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid}).populate("movie")
            .exec();

    /**
     * Inserts bookmark instance into the database
     * @param {Movie} movie Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksMovieByID = async (mid: string, uid: string): Promise<any> =>
        BookmarkModel.create({movie: mid, bookmarkedBy: uid});

     userBookmarksMovie = async(movie: Movie, uid: string) => {
        let bookmark = {};
        const existMovie = await MovieModel.findOne({imdbID: movie.imdbID});
        if (existMovie) {
            bookmark = await BookmarkModel.create({movie: movie._id, bookmarkedBy: uid});
        } else {
            const actualMovie = await MovieModel.create({movie})
            bookmark = await BookmarkModel.create({movie: actualMovie._id, bookmarkedBy: uid});
        }
        return bookmark;
    }

    /**
     * Removes bookmark from the database
     * @param {string} mid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksMovie = async (mid: string, uid: string): Promise<any> =>
        BookmarkModel.deleteOne({movie: mid, bookmarkedBy: uid});

    findUserBookmarksMovie = async (uid: string, mid: string): Promise<any> =>
        BookmarkModel.findOne({bookmarkedBy: uid, movie: mid});


}

