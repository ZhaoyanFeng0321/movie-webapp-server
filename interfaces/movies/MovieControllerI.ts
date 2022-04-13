import {Request, Response} from "express";

export default interface MovieControllerI {
    createMovie(req: Request, res: Response): void;

    findAllMovies(req: Request, res: Response): void;

    findMovieByImdbID(req: Request, res: Response): void;

    findMovieByID(req: Request, res: Response): void;

    //findMovieByUser(req: Request, res: Response): void;

    //createMovieByUser(req: Request, res: Response): void;

    likeMovie(req: Request, res: Response): void;

    dislikeMovie(req: Request, res: Response): void;

    updateMovie(req: Request, res: Response): void;

    deleteMovie(req: Request, res: Response): void;

    deleteAllMovie(req: Request, res: Response): void;
}