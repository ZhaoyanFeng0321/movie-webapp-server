/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Request, Response, Express} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/bookmarks/BookmarkControllerI";
import UserDao from "../daos/UserDao";
import MovieService from "../services/movieService";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/bookmarks to retrieve all bookmark instances
 *     </li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the movies bookmarked by a user
 *     </li>
 *     <li>GET /api/movies/:mid/bookmarks to retrieve all users that bookmarked a movie
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:mid to record that a user bookmarks a movie
 *     </li>
 *     <li>DELETE /api/users/:uid/unbookmarks/:mid to record that a user
 *     no longer bookmarks a movie</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {

    private static movieService: MovieService = MovieService.getInstance();
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {

        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();

            app.get("/api/bookmarks", BookmarkController.bookmarkController.findAllBookmarks);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllMoviesThatUserBookmarked);
            app.get("/api/movies/:mid/bookmarks", BookmarkController.bookmarkController.findAllUsersThatBookmarkedMovie);

            app.post("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userBookmarksMovie);
            app.delete("/api/users/:uid/unbookmarks/:mid", BookmarkController.bookmarkController.userUnbookmarksMovie);


        }

        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    /**
     * Retrieves all bookmarks from the database and returns an array of bookmarks.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects
     */
    findAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarks()
            .then(bookmarks => res.json(bookmarks));

    /**
     * Retrieves all movies bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user bookmarked the movies
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the movie objects that were bookmarked
     */

        // findAllMoviesThatUserBookmarked = (req: Request, res: Response) =>
        //     BookmarkController.bookmarkDao.findAllMoviesThatUserBookmarked(req.params.uid)
        //         .then(bookmarks => res.json(bookmarks));

    findAllMoviesThatUserBookmarked = async (req: Request, res: Response) => {

        // @ts-ignore
        let userId = req.params.uid === req.session['profile'].username && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;

        let flag = false;
        // @ts-ignore
        if (req.params.uid === req.session['profile'].username) {
            flag = true;
        }
        const userDao = UserDao.getInstance()

        if (!flag) {
            let user = await userDao.findUserByUsername(userId);
            userId = user._id;
        }

        BookmarkController.bookmarkDao.findAllMoviesThatUserBookmarked(userId)
            .then(async (bookmarks) => {
                const bookmarksNonNullMovies = bookmarks.filter(bookmark => bookmark.movie);
                const moviesFromLikes = bookmarksNonNullMovies.map(bookmark => bookmark.movie);
                const getMovies = await BookmarkController.movieService
                    .getMoviesForBookmarkByUser(userId, moviesFromLikes);
                res.json(getMovies);
            });

    }


    /**
     * Retrieves all users that bookmarked a movie from the database
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the bookmarked movie
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatBookmarkedMovie = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedMovie(req.params.mid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Create a new bookmark with given user and movie.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and mid representing the user that is bookmarking the movie
     * and the movie being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
        // userBookmarksMovie = (req: Request, res: Response) =>
        //     BookmarkController.bookmarkDao.userBookmarksMovie(req.params.mid, req.params.uid)
        //         .then(bookmarks => res.json(bookmarks));
    userBookmarksMovie = async (req: Request, res: Response) => {
        // const movie = req.body;
        const actualMovie = await BookmarkController.bookmarkDao.userBookmarksMovie(req.body, req.params.uid);
        res.json(actualMovie)
    }

    /**
     * Delete a bookmark in database and returns status of delete.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and mid representing the user that is unbookmarking
     * the movie and the movie being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userUnbookmarksMovie = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksMovie(req.params.mid, req.params.uid)
            .then(status => res.json(status));

}


