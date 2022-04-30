import mongoose from "mongoose";
import ListSchema from "./ListSchema";

const ListModel = mongoose.model('ListModel', ListSchema);

export default ListModel;