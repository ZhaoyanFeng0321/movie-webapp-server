import Bookmark from "../../models/bookmarks/Bookmark";
import Movie from "../../models/movies/Movie";

export default interface BookmarkDaoI{
    findAllBookmarks():Promise<Bookmark[]>;

    findAllMoviesThatUserBookmarked(uid:string): Promise<Bookmark[]>;

    findAllUsersThatBookmarkedMovie(mid: string):Promise<Bookmark[]>;

    //userBookmarksMovie(mid:string, uid:string): Promise<any>;

    userBookmarksMovie(movie:Movie, uid:string): Promise<any>;

    userBookmarksMovieByID(mid:string,uid:string): Promise<any>;


    userUnbookmarksMovie(mid:string,uid:string): Promise<any>;

}