/**
 * @file Implements mongoose model to CRUD
 * documents in the likes collection
 */
import mongoose from "mongoose";
import ActSchema from "./ActSchema";

const ActModel = mongoose.model("ActModel",ActSchema);

export default ActModel;