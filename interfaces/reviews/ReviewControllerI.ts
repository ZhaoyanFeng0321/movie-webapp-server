import {Request,Response} from "express";

export default interface ReviewControllerI {

    findAllReviews(req: Request,res:Response): void;

    findAllReviewByUser(req: Request,res:Response): void;

    findAllReviewByOMDB(req: Request,res:Response): void;

    findAllReviewsUserToMovie(req: Request,res:Response): void;

    createReview(req: Request,res:Response): void;

    deleteReview(req: Request,res:Response): void;

    deleteAllReviews(req: Request,res:Response): void;

}