import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeControllerI";

export default class LikeController implements LikeControllerI {

    private static likeDao: LikeDao = LikeDao.getInstance();
    private static likeController: LikeController | null = null;

    public static getInstance = (app: Express): LikeController => {

        if (LikeController.likeController == null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser)
            app.get("/api/tuits/:tid/likes",LikeController.likeController.findAllUsersThatLikedTUit);
            app.post("/api/users/:uid/likes/:tid",LikeController.likeController.userLikesTuit);
            app.delete("/api/users/:uid/unlikes/:tid",LikeController.likeController.userUnlikesTuit);
        }
        return LikeController.likeController;

    }

    private constructor() {
    }

    findAllTuitsLikedByUser = (req: Request, res: Response) =>
        LikeController.likeDao.findAllTuitsLikedByUser(req.params.uid)
            .then(likes=>res.json(likes));

    findAllUsersThatLikedTUit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes=>res.json(likes));

    userLikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userLikeTuit(req.params.tid,req.params.uid)
            .then(likes=>res.json(likes));

    userUnlikesTuit = (req: Request, res: Response) =>
    LikeController.likeDao.userUnlikesTuit(req.params.tid,req.params.uid)
        .then(status=>res.send(status));


};


