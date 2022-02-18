import {Request,Response,Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/bookmarks/BookmarkControllerI";
import LikeController from "./LikeController";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkController implements BookmarkControllerI {


    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    public static getInstance = (app: Express): BookmarkController => {

        if (BookmarkController.bookmarkController == null) {
            BookmarkController.bookmarkController = new BookmarkController();

            app.get("/api/bookmarks", BookmarkController.bookmarkController.findAllBookmarks);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsThatUserBookmarked);
            app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);

            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);


        }

        return BookmarkController.bookmarkController;
    }

    private constructor() {
    }

    findAllBookmarks = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllBookmarks()
            .then(bookmarks => res.json(bookmarks));

    findAllTuitsThatUserBookmarked = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsThatUserBookmarked(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.tid, req.params.uid)
            .then(status => res.json(status));

}


