import mongoose from "mongoose";
import Location from "../models/Location";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type:String, default:'PERSONAL',enum:['PERSONAL','ACADEMIC','PROFESSIONAL']},
    maritalStatus:{type:String, default:'SINGLE', enum:['MARRIED','SINGLE','WIDOWED'] },
    biography: String,
    dateOfBirth: Date,
    joined:{type: Date,default:Date.now},
    location:Location
},{collection:'users'});

export default UserSchema;
