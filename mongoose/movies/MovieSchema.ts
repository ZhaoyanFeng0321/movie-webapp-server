/**
 * @file Implements mongoose schema for movies
 */

import mongoose, {Schema} from "mongoose";
import Movie from "../../models/movies/Movie";

const MovieSchema = new mongoose.Schema<Movie>({
    title: {type: String, required: true},
    poster: String,
    //length: Number,
    //released: {type: Date, default: Date.now},
    //director: String,
    rating: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}

}, {collection: 'movies'});

export default MovieSchema;
