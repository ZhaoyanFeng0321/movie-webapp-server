/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/likes/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao private single instance of LikeDao
 */
export default class DislikeDao {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {
    }

    /**
     * Uses DislikeModel to retrieve all dislikes documents with specific tuit from dislikes collection
     * @returns Promise To be notified when the dislikes are retrieved from
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel.find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Uses LikeModel to retrieve all dislikes documents with specific user from dislikes collection
     * @returns Promise To be notified when the dislikes are retrieved from
     * database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel.find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path:"postedBy"
                }
            })
            .exec();

    /**
     * Inserts dislike instance into the database
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikeTuit = async (tid: string, uid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Removes dislike from the database
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when dislike is removed from the database
     */
    userCancelUnlikeTuit = async (tid: string, uid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});


    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    countHowManydislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});

}




