/**
 * @file Controller RESTful Web service API for movies resource
 */
import {Request, Response, Express} from "express";
import MovieDao from "../daos/MovieDao";
import MovieControllerI from "../interfaces/movies/MovieControllerI";
import Movie from "../models/movies/Movie";

/**
 * @class MovieController Implements RESTful Web service API for movies resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/movies to create a new movie instance for
 *     a given user</li>
 *     <li>GET /api/movies to retrieve all the movie instances</li>
 *     <li>GET /api/movies/:mid to retrieve a particular movie instances</li>
 *     <li>PUT /api/movies/:mid to modify an individual movie instance </li>
 *     <li>DELETE /api/movies/:mid to remove a particular movie instance</li>
 *     <li>DELETE /api/movies to remove all movie instances
 * </ul>
 * @property {MovieDao} movieDao Singleton DAO implementing movie CRUD operations
 * @property {MovieController} movieController Singleton controller implementing
 * RESTful Web service API
 */
export default class MovieController implements MovieControllerI {

    private static movieDao: MovieDao = MovieDao.getInstance();
    private static movieController: MovieController | null = null;


    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MovieController
     */
    public static getInstance = (app: Express): MovieController => {
        if (MovieController.movieController === null) {
            MovieController.movieController = new MovieController();
            app.post("/api/movies", MovieController.movieController.createMovie);
            app.post("/api/movies/likes", MovieController.movieController.likeMovie);
            app.post("/api/movies/dislikes", MovieController.movieController.dislikeMovie);

            app.get("/api/movies", MovieController.movieController.findAllMovies);
            app.get("/api/movies/:mid", MovieController.movieController.findMovieByID);
            app.get("/api/movies/:mid", MovieController.movieController.findMovieByImdbID);
            app.put("/api/movies/:mid", MovieController.movieController.updateMovie);
            app.delete("/api/movies/:mid", MovieController.movieController.deleteMovie);
            app.delete("/api/movies", MovieController.movieController.deleteAllMovie);
        }
        return MovieController.movieController;
    }


    private constructor() {
    }


    /**
     * Retrieves all movies from the database and returns an array of movies.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the movie objects
     */
    findAllMovies = (req: Request, res: Response) => {
        // // @ts-ignore
        // const profile = req.session['profile'];
        // if(profile){
        //     //if already login in
        //     const userId = profile._id;
        //     MovieController.movieDao.findAllMovies()
        //         .then(async (movies:Movie[])=>{
        //             const markedMovies = await MovieController.movieService
        //                 .getMoviesForLikeDislikeByUser(userId,movies);
        //             res.json(markedMovies);
        //         })
        // }else{
        //     //not login in
        MovieController.movieDao.findAllMovies()
            .then((movies: Movie[]) => res.json(movies));

    }

    createMovie = (req: Request, res: Response) => {
        MovieController.movieDao.createMovie(req.body)
            .then((movie: Movie) => res.json(movie))
    }

    findMovieByID = (req: Request, res: Response) =>
        MovieController.movieDao.findMovieByID(req.params.mid)
            .then((movie: Movie) => res.json(movie));

    /**
     * Retrieve a movie from the database and return a movie.
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the movie to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the movie that matches the movie ID
     */
    findMovieByImdbID = (req: Request, res: Response) =>
        MovieController.movieDao.findMovieByImdbID(req.params.mid)
            .then((movie: Movie) => res.json(movie));


    // /**
    //  * Retrieves all movies from the database for a particular user and returns
    //  * an array of movies.
    //  * @param {Request} req Represents request from client
    //  * @param {Response} res Represents response to client, including the
    //  * body formatted as JSON arrays containing the movie objects
    //  */
    // findMovieByUser = async (req: Request, res: Response) => {
    //
    //     // @ts-ignore
    //     let userId = req.params.uid === req.session['profile'].username && req.session['profile'] ?
    //         // @ts-ignore
    //         req.session['profile']._id : req.params.uid;
    //
    //     let flag = false;
    //     // @ts-ignore
    //     if (req.params.uid === req.session['profile'].username) {
    //         flag = true;
    //     }
    //     const userDao = UserDao.getInstance()
    //     if (!flag) {
    //         let user = await userDao.findUserByUsername(userId);
    //         userId = user._id;
    //     }
    //
    //
    //     MovieController.movieDao.findAllMoviesByUser(userId)
    //         .then(async (movies: Movie[]) => {
    //             const getMovies = await MovieController.movieService
    //                 .getMoviesForLikeDislikeByUser(userId, movies);
    //             res.json(getMovies)
    //         });
    // }

    // /**
    //  * Create a new movie with given user.
    //  * @param {Request} req Represents request from client, including body
    //  * containing the JSON object for the new movie to be inserted in the
    //  * database
    //  * @param {Response} res Represents response to client, including the
    //  * body formatted as JSON containing the new movie that was inserted in the
    //  * database
    //  */
    // createMovieByUser = (req: Request, res: Response) => {
    //
    //     // @ts-ignore
    //     let userId = req.params.uid === "my" &&req.session['profile'] ?
    //         // @ts-ignore
    //         req.session['profile']._id : req.params.uid;
    //
    //     MovieController.movieDao.createMovieByUser(userId,req.body)
    //         .then((movie)=>res.json(movie));
    //
    // }


    /**
     * Delete a movie in database and returns status of delete.
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the movie to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a movie was successful or not
     */
    deleteMovie = (req: Request, res: Response) =>
        MovieController.movieDao.deleteMovie(req.params.mid)
            .then((status) => res.json(status));

    /**
     * Update a movie in database and return status od update.
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the movie to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a movie was successful or not
     */
    updateMovie = (req: Request, res: Response) =>
        MovieController.movieDao.updateMovie(req.params.mid, req.body)
            .then((status) => res.json(status));


    likeMovie = async (req: Request, res: Response) => {
        const movie = req.body;
        const actualMovie = await MovieController.movieDao.likeMovie(movie);
        res.json(actualMovie)
    }

    dislikeMovie = async (req: Request, res: Response) => {
        const movie = req.body;
        const actualMovie = await MovieController.movieDao.dislikeMovie(movie);
        res.json(actualMovie)
    }

    /**
     * Delete all movies in database and returns status of delete.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting movies was successful or not
     */
    deleteAllMovie = (req: Request, res: Response) =>
        MovieController.movieDao.deleteAllMovie()
            .then((status) => res.json(status));


}

