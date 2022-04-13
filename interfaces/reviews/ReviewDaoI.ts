import Review from "../../models/reviews/Review";

export default interface ReviewDaoI {
    findAllReviews(): Promise<Review[]>;

    findAllReviewByUser(uid:string): Promise<Review[]>;

    findAllReviewByMovie(mid:string): Promise<Review[]>;

    findAllReviewsUserToMovie(uid:string,mid:string): Promise<Review[]>;

    // createReview(uid:string, movie:Movie, review: Review): Promise<Review>;
    createReview(uid:string, mid:string, review: Review): Promise<Review>;

    deleteReview(rid:string): Promise<any>;

    deleteAllReviews(): Promise<any>;

}