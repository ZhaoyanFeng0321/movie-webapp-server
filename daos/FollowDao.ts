import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/follows/FollowDaoI";
import LikeDao from "./LikeDao";

export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao == null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {
    }

    findAllFollow = async (): Promise<Follow[]> =>
        FollowModel.find();

    //找到user关注的人？
    findAllUsersThatUserFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    //找到user的粉丝
    findAllUsersThatFollowingUser = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({userFollowed: uid})
            .populate("userFollowing")
            .exec();

    //uid1 follow uid2
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({userFollowed: uid2, userFollowing: uid1});

    //uid1 unfollow uid2
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid2, userFollowing: uid1});


    userRemoveFollower = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed:uid1, userFollowing:uid2});


}