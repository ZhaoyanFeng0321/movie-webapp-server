/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Request, Response, Express} from "express";
import LikeDao from "../daos/LikeDao";
import TuitDao from "../daos/TuitDao";
import LikeControllerI from "../interfaces/likes/LikeControllerI";
import TuitService from "../services/tuitService";
import UserDao from "../daos/UserDao";

/**
 * @class LikeController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no longer likes a tuit</li>
 *     <li> DELETE /api/likes to delete all like instances
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing like CRUD operations
 * @property {LikeController} likeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikeController implements LikeControllerI {

    private static likeDao: LikeDao = LikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitSerive: TuitService = TuitService.getInstance();
    private static likeController: LikeController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return LikeController
     */
    public static getInstance = (app: Express): LikeController => {

        if (LikeController.likeController === null) {
            LikeController.likeController = new LikeController();
            app.get("/api/users/:uid/likes", LikeController.likeController.findAllTuitsLikedByUser)
            app.get("/api/tuits/:tid/likes", LikeController.likeController.findAllUsersThatLikedTUit);
            app.delete("/api/users/:uid/unlikes/:tid", LikeController.likeController.userUnlikesTuit);
            app.delete("/api/likes", LikeController.likeController.deleteAllLikes);
            app.put("/api/users/:uid/likes/:tid",LikeController.likeController.userTogglesTuitLikes);
        }
        return LikeController.likeController;

    }

    private constructor() {
    }

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser = async (req: Request, res: Response) => {

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


        LikeController.likeDao.findAllTuitsLikedByUser(userId)
            .then(async (likes) => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                const getTuits = await LikeController.tuitSerive
                    .getTuitsForLikeDislikeByUser(userId, tuitsFromLikes);
                res.json(getTuits);
            });

    }


    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTUit = (req: Request, res: Response) =>
        LikeController.likeDao.findAllUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));


    /**
     * Delete a like in database and returns status of delete.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikeController.likeDao.userUnlikesTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));

    /**
     * Delete all likes in database and returns status of delete.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting likes was successful or not
     */
    deleteAllLikes = (req: Request, res: Response) =>
        LikeController.likeDao.deleteAllLike()
            .then(status => res.send(status));


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userTogglesTuitLikes = async (req:Request,res:Response)=>{
        const likeDao = LikeController.likeDao;
        const tuitDao = LikeController.tuitDao;
        const uid = req.params.uid;
        const tid = req.params.tid;

        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "my" && profile?
            profile._id:uid;

        try{
            const userAlreadyLikedTuit = await likeDao.findUserLikesTuit(userId,tid);
            const howManyLikedTuit = await likeDao.countHowManyLikedTuit(tid);
            let tuit = await tuitDao.findTuitById(tid);

            if(userAlreadyLikedTuit){
                await likeDao.userUnlikesTuit(userId,tid);
                tuit.stats.likes = howManyLikedTuit - 1;
            }else{
                await likeDao.userLikeTuit(userId,tid);
                tuit.stats.likes = howManyLikedTuit + 1;
            };

            await tuitDao.updateLikes(tid,tuit.stats);
            res.sendStatus(200);
        }catch(e){
            res.sendStatus(404);
        }

    }

};


