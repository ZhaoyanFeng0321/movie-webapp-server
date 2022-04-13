// /**
//  * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
//  * to integrate with MongoDB
//  */
// import Review from "../models/reviews/Tuit";
// import ReviewModel from "../mongoose/review/TuitModel";
// import MovieDaoI from "../interfaces/movies/TuitDaoI";
//
// /**
//  * @class TuitDao Implements Data Access Object managing data storage
//  * of Tuits
//  * @property {TuitDao} tuitDao private single instance of TuitDao
//  */
// export default class TuitDao implements MovieDaoI {
//
//     private static tuitDao: TuitDao | null = null;
//
//     /**
//      * Creates singleton DAO instance
//      * @returns TuitDao
//      */
//     public static getInstance = (): TuitDao => {
//         if (TuitDao.tuitDao === null) {
//             TuitDao.tuitDao = new TuitDao();
//         }
//         return TuitDao.tuitDao;
//     }
//
//     private constructor() {
//     }
//
//     /**
//      * Uses TuitModel to retrieve all tuits documents from tuits collection
//      * @returns Promise To be notified when the tuits are retrieved from
//      * database
//      */
//     findAllTuits = async (): Promise<Review[]> =>
//         ReviewModel.find().populate("postedBy").exec();
//
//     /**
//      * Uses TuitModel to retrieve tuits document of specific user from tuits collection
//      * @param {string} uid User's primary key
//      * @returns Promise To be notified when the tuits are retrieved from the database
//      */
//     findAllTuitsByUser = async (uid: string): Promise<Review[]> =>
//         ReviewModel.find({postedBy: uid}).populate("postedBy").exec();
//
//     /**
//      * Uses TuitModel to retrieve single tuit document from tuits collection
//      * @param {string} tid Tuit's primary key
//      * @returns Promise To be notified when tuit is retrieved from the database
//      */
//     findTuitById = async (tid: string): Promise<any> =>
//         ReviewModel.findById(tid);
//
//     /**
//      * Inserts tuit instance into the database
//      * @param {string} uid User's primary key
//      * @param {Review} tuit Instance to be inserted into the database
//      * @returns Promise To be notified when tuit is inserted into the database
//      */
//     createTuitByUser = async (uid: string, tuit: Review): Promise<Review> =>
//         ReviewModel.create({...tuit, postedBy: uid});
//
//     /**
//      * Update tuit with new values in database
//      * @param {string} tid Primary key of tuit to be modified
//      * @param {Review} tuit Tuit object containing propertied and their new values
//      * @returns Promise To be notified when tuit is updated in the database
//      */
//     updateTuit = async (tid: string, tuit: Review): Promise<any> =>
//         ReviewModel.updateOne({_id: tid}, {$set: tuit});
//
//     /**
//      * Removes tuit from the database
//      * @param {string} tid Primary key of tuit to be removed
//      * @returns Promise To be notified when tuit is removed from the database
//      */
//     deleteTuit = async (tid: string): Promise<any> =>
//         ReviewModel.deleteOne({_id: tid});
//
//     /**
//      * Removes all tuits from the database. Useful for testing
//      * @returns Promise To be notified when all tuits are removed from the
//      * database
//      */
//     deleteAllTuit = async (): Promise<any> =>
//         ReviewModel.deleteMany();
//
//     updateLikes = async (tid: string, newStats: any): Promise<any> =>
//         ReviewModel.updateOne(
//             {_id:tid},
//             {$set:{stats:newStats}}
//         );
//
// }
//
//
//
//
//
//
//
//
