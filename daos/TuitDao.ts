import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";
import TuitDaoI from "../interfaces/tuits/TuitDaoI";

export default class TuitDao implements TuitDaoI {

    private static tuitDao: TuitDao | null = null;

    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao == null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {
    }

    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid);

    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit,postedBy:uid});

    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne({_id:tid},{$set:tuit});

    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({_id:tid});

}



