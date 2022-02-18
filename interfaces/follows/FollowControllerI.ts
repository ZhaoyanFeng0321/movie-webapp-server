import {Request,Response} from "express";


export default interface FollowControllerI{

    findAllFollow(req: Request,res:Response): void;

    findAllUsersThatFollowingUser(req: Request,res:Response): void;

    findAllUsersThatUserFollowing(req: Request,res:Response): void;

    userFollowsUser(req: Request,res:Response): void;

    userUnfollowsUser(req: Request,res:Response): void;

    userRemoveFollower(req: Request,res:Response): void;

}