import {Request,Response} from "express";

export default interface BookmarkControllerI{

    findAllBookmarks(req: Request, res: Response):void;

    findAllMoviesThatUserBookmarked(req: Request, res: Response): void;

    findAllUsersThatBookmarkedMovie(req: Request, res: Response):void;

    userBookmarksMovie(req: Request, res: Response): void;

    userBookmarksMovieByID(req: Request, res: Response): void;

    userUnbookmarksMovie(req: Request, res: Response): void;


}