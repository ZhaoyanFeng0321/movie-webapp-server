import mongoose, {Schema} from "mongoose";
import WatchList from "../../models/users/WatchList";

const ListSchema = new mongoose.Schema<WatchList>({
    user: String,
    movie: [String]

}, {collection: "watchlist"});

export default ListSchema;