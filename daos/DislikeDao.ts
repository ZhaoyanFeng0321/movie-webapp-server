/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import Dislike from "../models/dislikes/Dislike";
import DislikeModel from "../mongoose/dislikes/DislikeModel";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao private single instance of DislikeDao
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
     * Uses DislikeModel to retrieve all dislikes documents with specific user from dislikes collection
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
    userDislikeTuit = async (uid: string,tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Removes dislike from the database
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when dislike is removed from the database
     */
    userCancelUnlikeTuit = async (uid: string,tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});


    /**
     * Check dislike instance is exist
     * @param {string} tid Tuit's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when find the dislike record
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Count how many dislikes for specific tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when count finish
     */
    countHowManydislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});

}




