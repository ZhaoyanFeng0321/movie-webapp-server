import User from "../users/User";
import Movie from "../movies/Movie";

export default interface Act{
    actedBy: User,
    movie: Movie
};