import mongoose from "mongoose";
import User from "../models/User";

const TuitSchema = new mongoose.Schema({

    tuit:{type:String,required:true},
    postedOn: {type: Date, default: Date.now},
    postedBy: User
},{collection:'tuits'} );

export default TuitSchema;