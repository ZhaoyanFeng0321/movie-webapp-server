import mongoose, {Schema} from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: {type: Schema.Types.ObjectId} ,
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {
        type: String,
        enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']
    },
    maritalStatus: {type: String, enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number},
        longitude: {type: Number}
    }
}, {collection: 'users'});

export default UserSchema;
