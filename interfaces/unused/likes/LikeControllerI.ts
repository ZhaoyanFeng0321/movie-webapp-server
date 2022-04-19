import {Request, Response} from "express";

export default interface LikeControllerI {
    findAllUsersThatLikedTUit(req: Request, res: Response): void;

    findAllTuitsLikedByUser(req: Request, res: Response): void;

    userUnlikesTuit(req: Request, res: Response): void;

    deleteAllLikes(req: Request,res:Response):void;


}