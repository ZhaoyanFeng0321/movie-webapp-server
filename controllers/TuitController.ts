import {Request, Response, Express} from "express";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitControllerI";
import Tuit from "../models/tuits/Tuit";
import TuitModel from "../mongoose/tuits/TuitModel";

export default class TuitController implements TuitControllerI {

    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;

    public static getInstance = (app:Express): TuitController => {
        if(TuitController.tuitController==null){
            TuitController.tuitController = new TuitController();

            app.get("/api/tuits",TuitController.tuitController.findAllTuits);
            app.get("/api/users/:uid/tuits",TuitController.tuitController.findTuitByUser);
            app.get("/api/tuits/:tid",TuitController.tuitController.findTuitById);
            app.post("/api/users/:uid/tuits",TuitController.tuitController.createTuitByUser);
            app.put("/api/tuits/:tid",TuitController.tuitController.updateTuit);
            app.delete("/api/tuits/:tid",TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }


    private constructor() {}


    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits:Tuit[]) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.tid)
            .then((tuit:Tuit) => res.json(tuit));

    findTuitByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuitsByUser(req.params.tid)
            .then((tuits:Tuit[]) => res.json(tuits));

    createTuitByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuitByUser(req.params.uid,req.body)
            .then((tuit:Tuit) => res.json(tuit));

    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.tid)
            .then((status) => res.json(status));

    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.tid, req.body)
            .then((status) => res.json(status));
}
