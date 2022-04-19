import {Request, Response} from "express";

export default interface ActControllerI {
    findAllActs(req: Request, res: Response): void;

    findAllMoviesByActor(req: Request, res: Response): void;

    findAllActorsByMovie(req: Request, res: Response): void;

    findMovieByActor(req: Request, res: Response): void;

    createActing(req: Request, res: Response): void;

    removeActing(req: Request, res: Response): void;
}