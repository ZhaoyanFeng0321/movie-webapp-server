/**
 * @file Implements DAO managing data storage of movies. Uses mongoose MovieModel
 * to integrate with MongoDB
 */
import Movie from "../models/movies/Movie";
import MovieDaoI from "../interfaces/movies/MovieDaoI";
import MovieModel from "../mongoose/movies/MovieModel";

/**
 * @class MovieDao Implements Data Access Object managing data storage
 * of Movies
 * @property {MovieDao} movieDao private single instance of MovieDao
 */
export default class MovieDao implements MovieDaoI {

    private static movieDao: MovieDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MovieDao
     */
    public static getInstance = (): MovieDao => {
        if (MovieDao.movieDao === null) {
            MovieDao.movieDao = new MovieDao();
        }
        return MovieDao.movieDao;
    }

    private constructor() {
    }

    createMovie = async (movie: Movie): Promise<Movie> =>
        MovieModel.create(movie);
    /**
     * Uses MovieModel to retrieve all movies documents from movies collection
     * @returns Promise To be notified when the movies are retrieved from
     * database
     */
    findAllMovies = async (): Promise<Movie[]> =>
        MovieModel.find().exec();

    /**
     * Uses MovieModel to retrieve single movie document from movies collection
     * @param {string} mid Movie's primary key
     * @returns Promise To be notified when movie is retrieved from the database
     */
    findMovieByID = async (mid: string): Promise<any> =>
        MovieModel.findOne({_id: mid});

    findMovieByImdbID = async (mid: string): Promise<any> =>
        MovieModel.findOne({imdbID: mid});

    likeMovie = async (movie: Movie) => {
        let actualMovie = {};
        const existMovie = await MovieModel.findOne({imdbID: movie.imdbID});
        if(existMovie) {
            // @ts-ignore
            const status = await MovieModel.updateOne({imdbID: movie.imdbID}, {$set: {likes: existMovie.likes + 1}})
            // @ts-ignore
            actualMovie = {...existMovie, likes: existMovie.likes + 1}
        } else {
            actualMovie = await MovieModel.create({
                ...movie,
                likes: 1,
                dislikes: 0
            })
        }
        return actualMovie;
    }

    dislikeMovie = async (movie: Movie) => {
        let actualMovie = {};
        const existMovie = await MovieModel.findOne({imdbID: movie.imdbID});
        if(existMovie) {
            // @ts-ignore
            const status = await MovieModel.updateOne({imdbID: movie.imdbID}, {$set: {likes: existMovie.likes + 1}})
            // @ts-ignore
            actualMovie = {...existMovie, likes: existMovie.dislikes + 1}
        } else {
            actualMovie = await MovieModel.create({
                ...movie,
                likes: 0,
                dislikes: 1
            })
        }
        return actualMovie;
    }

    /**
     * Update movie with new values in database
     * @param {string} mid Primary key of movie to be modified
     * @param {Movie} movie Movie object containing propertied and their new values
     * @returns Promise To be notified when movie is updated in the database
     */
    updateMovie = async (mid: string, movie: Movie): Promise<any> =>
        MovieModel.updateOne({_id: mid}, {$set: movie});

    /**
     * Removes movie from the database
     * @param {string} mid Primary key of movie to be removed
     * @returns Promise To be notified when movie is removed from the database
     */
    deleteMovie = async (mid: string): Promise<any> =>
        MovieModel.deleteOne({_id: mid});

    /**
     * Removes all movies from the database. Useful for testing
     * @returns Promise To be notified when all movies are removed from the
     * database
     */
    deleteAllMovie = async (): Promise<any> =>
        MovieModel.deleteMany();

}








