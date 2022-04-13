/**
 * @file Controller RESTful Web service API for reviews resource
 */
import ReviewControllerI from "../interfaces/reviews/ReviewControllerI";
import ReviewDao from "../daos/ReviewDao";
import {Express, Request, Response} from "express";
import Review from "../models/reviews/Review";
import MovieService from "../services/movieService";


/**
 * @class ReviewController Implements RESTful Web service API for reviews resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/reviews/sent to retrieve all the reviews user sent
 *     </li>
 *     <li>GET /api/users/:uid/reviews/received to retrieve all the reviews user received
 *     </li>
 *     <li>Get /api/users/:uid1/reviews/:uid2 to retrieve all reviews user1 sent to user2
 *     </li>
 *     <li>POST /api/users/:uid1/reviews/:uid2 to record that user1 send review to user2
 *     </li>
 *     <li>DELETE /api/reviews/:mid to remove a particular review instance
 *     </li>
 *     <li> DELETE /api/reviews to remove all review instances
 *     </ul>
 * @property {ReviewDao} reviewDao Singleton DAO implementing follow CRUD operations
 * @property {ReviewController} reviewController Singleton controller implementing
 * RESTful Web service API
 */
export default class ReviewController implements ReviewControllerI {

    private static movieService: MovieService = MovieService.getInstance();
    private static reviewDao: ReviewDao = ReviewDao.getInstance();
    private static reviewController: ReviewController | null = null;

    public static getInstance = (app: Express): ReviewController => {

        if (ReviewController.reviewController === null) {
            ReviewController.reviewController = new ReviewController();
            app.get("/api/reviews", ReviewController.reviewController.findAllReviews);

            app.get("/api/users/:uid/reviews", ReviewController.reviewController.findAllReviewByUser);
            app.get("/api/movies/:mid/reviews", ReviewController.reviewController.findAllReviewByMovie);
            app.get("/api/users/:uid/reviews/:mid", ReviewController.reviewController.findAllReviewsUserToMovie);

            app.post("/api/users/:uid/reviews/:mid", ReviewController.reviewController.createReview);
            app.delete("/api/reviews/:rid", ReviewController.reviewController.deleteReview);
            app.delete("/api/reviews", ReviewController.reviewController.deleteAllReviews);

        }
        return ReviewController.reviewController;

    }

    private constructor() {
    }

    /**
     * Retrieves all reviews that user sent
     * @param {Request} req Represents request from client, including the path
     * parameter uid identifying the foreign key from of review to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the review objects
     */
        findAllReviewByUser = async (req: Request, res: Response) =>
            ReviewController.reviewDao.findAllReviewByUser(req.params.uid)
                .then(reviews => res.json(reviews));


    /**
     * Retrieves all reviews that user received
     * @param {Request} req Represents request from client, including the path
     * parameter uid identifying the foreign key to of review to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the review objects
     */
    findAllReviewByMovie = async (req: Request, res: Response) =>
        ReviewController.reviewDao.findAllReviewByMovie(req.params.rid)
            .then(reviews => res.json(reviews));

    /**
     * Retrieves all reviews that user sent to movie
     * @param {Request} req Represents request from client, including the path
     * parameter uid1 and uid2 identifying the foreign key from and to of review to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the review objects
     */
    findAllReviewsUserToMovie = async (req: Request, res: Response) =>
        ReviewController.reviewDao.findAllReviewsUserToMovie(req.params.uid, req.params.mid)
            .then(reviews => res.json(reviews));

    /**
     * Delete a review in database and returns status of delete.
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the review to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a review was successful or not
     */
    deleteReview = async (req: Request, res: Response) =>
        ReviewController.reviewDao.deleteReview(req.params.mid)
            .then(status => res.json(status));


    /**
     * Create a new review with sender user1 and receiver user2.
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new review to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new review that was inserted in the
     * database
     */
        // createReview = async (req: Request, res: Response) =>
        //     ReviewController.reviewDao.createReview(req.params.uid, req.params.mid, req.body)
        //         .then(review => res.json(review));

    createReview = (req: Request, res: Response) => {
        // @ts-ignore
        let userId = req.params.uid === "my" && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;

        ReviewController.reviewDao.createReview(userId, req.params.mid, req.body)
            .then(review => res.json(review));

    }

    /**
     * Delete all reviews in database and returns status of delete.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting reviews was successful or not
     */
    deleteAllReviews = async (req: Request, res: Response) =>
        ReviewController.reviewDao.deleteAllReviews()
            .then(status => res.json(status));

    findAllReviews = async (req: Request, res: Response) =>
        ReviewController.reviewDao.findAllReviews()
            .then((reviews: Review[]) => res.json(reviews));

}

// findAllReviewByUser = async (req: Request, res: Response) => {
//
//     // @ts-ignore
//     let userId = req.params.uid === req.session['profile'].username && req.session['profile'] ?
//         // @ts-ignore
//         req.session['profile']._id : req.params.uid;
//
//     let flag = false;
//     // @ts-ignore
//     if (req.params.uid === req.session['profile'].username) {
//         flag = true;
//     }
//     const userDao = UserDao.getInstance()
//     if (!flag) {
//         let user = await userDao.findUserByUsername(userId);
//         userId = user._id;
//     }
//
//
//     ReviewController.reviewDao.findAllReviewByUser(userId)
//         .then(async (movies: Movie[]) => {
//             const getReviews = await ReviewController.movieService
//                 .getMoviesForReviewByUser(userId, movies);
//             res.json(getReviews)
//         });
// }

