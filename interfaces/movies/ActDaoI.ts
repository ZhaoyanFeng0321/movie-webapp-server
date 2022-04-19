import Act from "../../models/acts/Act";

export default interface ActDaoI{

    findAllActs(): Promise<Act[]>;

    findAllMoviesByActor(uid: string): Promise<Act[]>;

    findAllActorsByMovie(mid:string): Promise<Act[]>;

    findMovieByActor(uid: string, mid:string): Promise<Act>;

    createActing(uid:string, mid:string): Promise<any>;

    removeActing(aid:string): Promise<any>;

}