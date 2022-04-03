/**
 * @file Tuit service for helping get specific data
 */
import Tuit from "../models/tuits/Tuit";
import LikeDao from "../daos/LikeDao";
import DislikeDao from "../daos/DislikeDao";

export default class TuitService{
    public static tuitService: TuitService | null = null;
    private static likeDao: LikeDao = LikeDao.getInstance();
    private static dislikeDao: DislikeDao = DislikeDao.getInstance();

    /**
     * Creates singleton service instance
     * @return TuitService
     */
    public static getInstance = (): TuitService => {
        if(TuitService.tuitService===null){
            TuitService.tuitService = new TuitService();
        }
        return TuitService.tuitService;
    }

    private constructor() {
    }

    public getTuitsForLikeDislikeByUser = async (uid:any,tuits:Tuit[]): Promise<any[]> =>{
        let findLikesPromises: any[] = []
        let findDislikesPromises: any[] = []

        tuits.forEach((tuit:any)=>{
            let findLikePromise = TuitService.likeDao.findUserLikesTuit(uid,tuit._id);
            let findDislikePromise = TuitService.dislikeDao.findUserDislikesTuit(uid, tuit._id);

            findLikesPromises.push(findLikePromise);
            findDislikesPromises.push(findDislikePromise);

        })

        const likedTuits = await Promise.all(findLikesPromises);
        const dislikedTuits = await Promise.all(findDislikesPromises);

        const likedTuitIds = likedTuits.map((t)=>{
            if(t){
                return t.tuit.toString();
            }
        })

        const dislikedTuitIds = dislikedTuits.map((t)=>{
            if(t){
                return t.tuit.toString();
            }
        })

        const getTuits = tuits.map((t:any)=>{
            let newT = t.toObject();

            if(likedTuitIds.indexOf(t._id.toString())>=0){
                newT = {...newT, likedByMe: true};
            }

            if(dislikedTuitIds.indexOf(t._id.toString())>=0){
                newT = {...newT, dislikedByMe:true};
            }

            if(newT.postedBy._id.toString()===uid.toString()){
                newT = {...newT, postedByMe:true};
            }
            return newT;
        })
        return getTuits;
    }


}