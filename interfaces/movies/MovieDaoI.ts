import Movie from '../../models/movies/Movie';

export default interface MovieDaoI {
    createMovie(movie: Movie): Promise<Movie>;

    findAllMovies(): Promise<Movie[]>;

    //findAllMoviesByUser(uid: string): Promise<Movie[]>;

    findMovieByImdbID(tid: string): Promise<any>;

    findMovieByID(tid: string): Promise<any>;

    // createMovieByUser(uid: string, tuit: Movie): Promise<Movie>;

    likeMovie(movie: Movie): Promise<any>;

    dislikeMovie(movie: Movie): Promise<any>;

    updateMovie(mid: string, movie: Movie): Promise<any>;

    deleteMovie(mid: string): Promise<any>;

    deleteAllMovie(): Promise<any>;

};