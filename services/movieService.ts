/**
 * @file Tuit service for helping get specific data
 */
import Movie from "../models/movies/Movie";
import BookmarkDao from "../daos/BookmarkDao";

export default class MovieService {
    public static movieService: MovieService | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();


    /**
     * Creates singleton service instance
     * @return MovieService
     */
    public static getInstance = (): MovieService => {
        if(MovieService.movieService===null){
            MovieService.movieService = new MovieService();
        }
        return MovieService.movieService;
    }

    private constructor() {
    }

    public getMoviesForBookmarkByUser = async (uid:any, movies:Movie[]): Promise<any[]> =>{
        let findBookmarksPromises: any[] = []

        movies.forEach((movie:any)=>{
            let findBookmarksPromise = MovieService.bookmarkDao.findUserBookmarksMovie(uid,movie._id);

            findBookmarksPromises.push(findBookmarksPromise);

        })

        const bookmarkMovies = await Promise.all(findBookmarksPromises);

        const bookmarkMovieIds = bookmarkMovies.map((t)=>{
            if(t){
                return t.movie.toString();
            }
        })

        const getMovies = movies.map((t:any)=>{
            let newM = t.toObject();

            if(bookmarkMovieIds.indexOf(t._id.toString())>=0){
                newM = {...newM, bookmarkedByMe: true};
            }

            // if(newM.postedBy._id.toString()===uid.toString()){
            //     newM = {...newM, postedByMe:true};
            // }
            return newM;
        })
        return getMovies;
    }

}