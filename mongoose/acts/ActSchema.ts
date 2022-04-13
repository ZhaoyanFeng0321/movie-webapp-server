/**
 * @file Implements mongoose schema for acts
 */
import mongoose, {Schema} from "mongoose";
import Act from "../../models/acts/Act";

const ActSchema = new mongoose.Schema<Act>({
    actedBy: {type:Schema.Types.ObjectId,ref:"UserModel"},
    movie: {type:Schema.Types.ObjectId,ref:"MovieModel"}
},{collection:"acts"});

export default ActSchema;