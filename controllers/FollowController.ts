import FollowControllerI from "../interfaces/follows/FollowControllerI";
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";


export default class FollowController implements FollowControllerI {

    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {

        if (FollowController.followController == null) {
            FollowController.followController = new FollowController();

            app.get("/api/users/:uid/followings", FollowController.followController.findAllUsersThatUserFollowing);
            app.get("/api/users/:uid/followers", FollowController.followController.findAllUsersThatFollowingUser);
            app.get("/api/follows", FollowController.followController.findAllFollow);

            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.followController.userUnfollowsUser);
            app.delete("/api/users/:uid1/removesfollower/:uid2", FollowController.followController.userRemoveFollower);

        }

        return FollowController.followController;

    }

    private constructor() {
    }


    findAllFollow = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollow()
            .then(follows => res.json(follows));


    findAllUsersThatFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowingUser(req.params.uid)
            .then(follows => res.json(follows));


    findAllUsersThatUserFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatUserFollowing(req.params.uid)
            .then(follows => res.json(follows));

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.json(status));

    userRemoveFollower = (req: Request, res: Response) =>
        FollowController.followDao.userRemoveFollower(req.params.uid1, req.params.uid2)
            .then(status => res.json(status));


}

