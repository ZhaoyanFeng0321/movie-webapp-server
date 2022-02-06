import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";

export default class TuitDao implements TuitDaoI {
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    async findAllTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

    async findTuitById(tid: string): Promise<Tuit> {
        return TuitModel.findById(tid);
    }

    async createTuit(tuit: Tuit): Promise<Tuit> {
        return TuitModel.create(tuit);
    }

    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({_id: tid});
    }

}