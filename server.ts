/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express from "express";
import mongoose from "mongoose";

import UserController from "./controllers/UserController";
import ReviewController from "./controllers/ReviewController";
import FollowController from "./controllers/FollowController";
//import BookmarkController from "./controllers/BookmarkController";
import AuthenticationController from "./controllers/AuthenticationController";
import SessionController from "./controllers/SessionController";
import MovieController from "./controllers/MovieController";
import ActController from "./controllers/ActController";

const cors = require("cors");
const session = require("express-session");
mongoose.connect('mongodb+srv://irisfeng:Aa970321@cluster0.leeis.mongodb.net/finalProject?retryWrites=true&w=majority');

const app = express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

const SECRET = 'process.env.SECRET';
let sess = {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false
    }
}

if (process.env.ENVIRONMENT === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(express.json({limit: '10mb'}));

const userController = UserController.getInstance(app);
const tuitController = ReviewController.getInstance(app);
const followController = FollowController.getInstance(app);
//const bookmarkController = BookmarkController.getInstance(app);
const movieController = MovieController.getInstance(app);
const reviewController = ReviewController.getInstance(app);
const actController = ActController.getInstance(app);




app.get('/', (req, res) =>
    res.send('Hello World!'));


SessionController(app);
AuthenticationController(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);


//Todo: acting, build database mon