/**
 * @file Implements DAO managing data storage of reviews. Uses mongoose ReviewModel
 * to integrate with MongoDB
 */
import ReviewDaoI from "../interfaces/reviews/ReviewDaoI";
import ReviewModel from "../mongoose/reviews/ReviewModel";
import Review from "../models/reviews/Review";

/**
 * @class ReviewDao Implements Data Access Object managing data storage
 * of Reviews
 * @property {ReviewDao} reviewDao private single instance of ReviewDao
 */
export default class ReviewDao implements ReviewDaoI {

    private static reviewDao: ReviewDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns ReviewDao
     */
    public static getInstance = (): ReviewDao => {
        if (ReviewDao.reviewDao === null) {
            ReviewDao.reviewDao = new ReviewDao();
        }

        return ReviewDao.reviewDao;
    }

    private constructor() {
    }

    /**
     * Uses ReviewModel to retrieve all reviews document that specific user sent from reviews collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when reviews are retrieved from the database
     */
    findAllReviewByUser = async (uid: string): Promise<Review[]> =>
        ReviewModel.find({from: uid});

    /**
     * Uses ReviewModel to retrieve all reviews document that specific user received from reviews collection
     * @param {string} omdbId movie's primary key
     * @returns Promise To be notified when reviews are retrieved from the database
     */
    findAllReviewByOMDB = async (omdbId: string): Promise<Review[]> =>
        ReviewModel.find({to: omdbId});

    /**
     * Uses ReviewModel to retrieve all reviews document that specific user sent to another specific
     * user from reviews collection
     * @param {string} uid User's primary key of sender
     * @param {string} omdbId Movie's primary key of receiver
     * @returns Promise To be notified when reviews are retrieved from the database
     */
    findAllReviewsUserToMovie = async (uid: string, omdbId: string): Promise<Review[]> =>
        ReviewModel.find({from: uid, to: omdbId});

    /**
     * Inserts review instance into the database
     * @param {string} uid User's primary key of sender
     * @param {string} omdbId User's primary key of receive
     * @param {Review} review Instance to be inserted into the database
     * @returns Promise To be notified when review is inserted into the database
     */
    createReview = async (uid: string, omdbId: string, review: Review): Promise<Review> =>
        ReviewModel.create({...review, from: uid, to: omdbId});

    /**
     * Removes review from the database
     * @param {string} rid Primary key of review to be removed
     * @returns Promise To be notified when review is removed from the database
     */
    deleteReview = async (rid: string): Promise<any> =>
        ReviewModel.deleteOne({_id:rid});


    /**
     * Removes all reviews from the database. Useful for testing
     * @returns Promise To be notified when all reviews are removed from the
     * database
     */
    deleteAllReviews = async (): Promise<any> =>
        ReviewModel.deleteMany();

    findAllReviews = async (): Promise<Review[]> =>
        ReviewModel.find().exec();
}

