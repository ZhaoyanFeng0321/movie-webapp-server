import Like from "../../../models/unused/likes/Like";

export default interface LikeDaoI {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;

    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;

    userUnlikesTuit(tid: string, uid: string): Promise<any>;

    userLikeTuit(tid:string,uid:string):Promise<any>;

    deleteAllLike(): Promise<any>;
}