import User from "../users/User";
import mongoose from "mongoose";

export default class Tuit {
    private _id: mongoose.Schema.Types.ObjectId|null=null;
    private tuit: string = '';
    private postedBy: User | null = null;
    private postedOn: Date = new Date();

}