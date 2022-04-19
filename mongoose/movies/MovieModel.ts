/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
import mongoose from "mongoose";
import MovieSchema from "./MovieSchema";

const MovieModel = mongoose.model('MovieModel', MovieSchema);

export default MovieModel;