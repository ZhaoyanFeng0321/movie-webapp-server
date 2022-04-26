import Review from "../../models/reviews/Review";

export default interface ReviewDaoI {
    findAllReviews(): Promise<Review[]>;

    findAllReviewByUser(uid:string): Promise<Review[]>;

    //findAllReviewByMovie(mid:string): Promise<Review[]>;

    findAllReviewByOMDB(omdbId:string): Promise<Review[]>;

    findAllReviewsUserToMovie(uid:string,omdbId:string): Promise<Review[]>;

    createReview(uid:string, omdbId:string, review: Review): Promise<Review>;

    deleteReview(rid:string): Promise<any>;

    deleteAllReviews(): Promise<any>;

}