import mongoose from "mongoose";
import Stats from "../reviews/Stats";

export default interface WatchList {
    user: string;
    movie?: Array<string>;
}