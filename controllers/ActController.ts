/**
 * @file Controller RESTful Web service API for acts resource
 */
import {Request, Response, Express} from "express";
import ActDao from "../daos/ActDao";
import ActControllerI from "../interfaces/movies/ActControllerI";
import UserDao from "../daos/UserDao";
import MovieService from "../services/movieService";

/**
 * @class ActController Implements RESTful Web service API for acts resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/acts to retrieve all act instances
 *     </li>
 *     <li>GET /api/users/:uid/acts to retrieve all the movies acted by a user
 *     </li>
 *     <li>GET /api/movies/:mid/acts to retrieve all users that acted a movie
 *     </li>
 *     <li>POST /api/users/:uid/acts/:mid to record that a user acts a movie
 *     </li>
 *     <li>DELETE /api/users/:uid/unacts/:mid to record that a user
 *     no longer acts a movie</li>
 * </ul>
 * @property {ActDao} actDao Singleton DAO implementing act CRUD operations
 * @property {ActController} actController Singleton controller implementing
 * RESTful Web service API
 */
export default class ActController implements ActControllerI {

    private static actDao: ActDao = ActDao.getInstance();
    private static actController: ActController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return ActController
     */
    public static getInstance = (app: Express): ActController => {

        if (ActController.actController === null) {
            ActController.actController = new ActController();

            app.get("/api/acts", ActController.actController.findAllActs);
            app.get("/api/users/:uid/acts", ActController.actController.findAllMoviesByActor);
            app.get("/api/movies/:mid/actors", ActController.actController.findAllActorsByMovie);
            app.get("/api/users/:uid/acts/:mid", ActController.actController.findMovieByActor);

            app.post("/api/users/:uid/acts/:mid", ActController.actController.createActing);
            app.delete("/api/acts/:aid", ActController.actController.removeActing);


        }

        return ActController.actController;
    }

    private constructor() {
    }

    /**
     * Retrieves all acts from the database and returns an array of acts.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the act objects
     */
    findAllActs = (req: Request, res: Response) =>
        ActController.actDao.findAllActs()
            .then(acts => res.json(acts));

    /**
     * Retrieves all movies acted by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user acted the movies
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the movie objects that were acted
     */

        // findAllMoviesThatUserActed = (req: Request, res: Response) =>
        //     ActController.actDao.findAllMoviesThatUserActed(req.params.uid)
        //         .then(acts => res.json(acts));

    findAllMoviesByActor = async (req: Request, res: Response) => {

        // @ts-ignore
        let userId = req.params.uid === req.session['profile'].username && req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.uid;

        let flag = false;
        // @ts-ignore
        if (req.params.uid === req.session['profile'].username) {
            flag = true;
        }
        const userDao = UserDao.getInstance()

        if (!flag) {
            let user = await userDao.findUserByUsername(userId);
            userId = user._id;
        }

        ActController.actDao.findAllMoviesByActor(userId)
            .then(acts => res.json(acts));

    }


    /**
     * Retrieves all users that acted a movie from the database
     * @param {Request} req Represents request from client, including the path
     * parameter mid representing the acted movie
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllActorsByMovie = (req: Request, res: Response) =>
        ActController.actDao.findAllActorsByMovie(req.params.mid)
            .then(acts => res.json(acts));

    findMovieByActor = (req: Request, res: Response) =>
        ActController.actDao.findMovieByActor(req.params.uid, req.params.mid)
            .then(act => res.json(act));


    /**
     * Create a new act with given user and movie.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and mid representing the user that is acting the movie
     * and the movie being acted
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new act that was inserted in the
     * database
     */
        // userActsMovie = (req: Request, res: Response) =>
        //     ActController.actDao.userActsMovie(req.params.mid, req.params.uid)
        //         .then(acts => res.json(acts));
    createActing = async (req: Request, res: Response) => {
        // const movie = req.body;
        const actualMovie = await ActController.actDao.createActing(req.params.uid, req.params.mid);
        res.json(actualMovie)
    }

    /**
     * Delete a act in database and returns status of delete.
     * @param {Request} req Represents request from client, including the
     * path parameters uid and mid representing the user that is unacting
     * the movie and the movie being unacted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the act was successful or not
     */
    removeActing = (req: Request, res: Response) =>
        ActController.actDao.removeActing(req.params.aid)
            .then(status => res.json(status));

}


