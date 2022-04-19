/**
 * @file Implements DAO managing data storage of acts. Uses mongoose ActModel
 * to integrate with MongoDB
 */
import ActModel from "../mongoose/acts/ActModel";
import Act from "../models/acts/Act";
import ActDaoI from "../interfaces/movies/ActDaoI";

/**
 * @class ActDao Implements Data Access Object managing data storage
 * of Acts
 * @property {ActDao} actDao private single instance of ActDao
 */
export default class ActDao implements ActDaoI {
    private static actDao: ActDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns ActDao
     */
    public static getInstance = (): ActDao => {
        if (ActDao.actDao === null) {
            ActDao.actDao = new ActDao();
        }
        return ActDao.actDao;

    }

    private constructor() {
    }

    /**
     * Uses ActModel to retrieve all acts documents from acts collection
     * @returns Promise To be notified when the acts are retrieved from
     * database
     */
    findAllActs = async (): Promise<Act[]> =>
        ActModel.find();

    /**
     * Uses ActModel to retrieve all acts documents with specific tuit from acts collection
     * @returns Promise To be notified when the acts are retrieved from
     * database
     */
    findAllActorsByMovie = async (mid: string): Promise<Act[]> =>
        ActModel.find({movie: mid})
            .populate("actedBy")
            .exec();

    /**
     * Uses ActModel to retrieve all acts documents with specific user from acts collection
     * @returns Promise To be notified when the acts are retrieved from
     * database
     */
    findAllMoviesByActor = async (uid: string): Promise<Act[]> =>
        ActModel.find({actedBy: uid}).populate("movie")
            .exec();

    /**
     * Inserts act instance into the database
     * @param {string} mid Movie's primary key
     * @param {string} uid User's primary key
     * @returns Promise To be notified when act is inserted into the database
     */
    createActing = async (uid: string, mid: string): Promise<any> =>
        ActModel.create({movie: mid, actedBy: uid});

    // createActing = async(movie: Movie, uid: string) => {
    //     let act = {};
    //     const existMovie = await MovieModel.findOne({imdbID: movie.imdbID});
    //     if (existMovie) {
    //         act = await ActModel.create({movie: movie._id, actedBy: uid});
    //     } else {
    //         const actualMovie = await MovieModel.create({movie})
    //         act = await ActModel.create({movie: actualMovie._id, actedBy: uid});
    //     }
    //     return act;
    // }

    /**
     * Removes act from the database
     * @param {string} aid primary key
     * @returns Promise To be notified when act is removed from the database
     */
    removeActing = async (aid:string): Promise<any> =>
        ActModel.deleteOne({_id: aid});

    findMovieByActor = async (uid: string, mid: string): Promise<any> =>
        ActModel.findOne({actedBy: uid, movie: mid});


}

