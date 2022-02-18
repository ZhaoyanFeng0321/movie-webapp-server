import {Request,Response} from "express";
import Bookmark from "../../models/bookmarks/Bookmark";

export default interface BookmarkControllerI{

    findAllBookmarks(req: Request, res: Response):void;

    findAllTuitsThatUserBookmarked(req: Request, res: Response): void;

    findAllUsersThatBookmarkedTuit(req: Request, res: Response):void;

    userBookmarksTuit(req: Request, res: Response): void;

    userUnbookmarksTuit(req: Request, res: Response): void;


}