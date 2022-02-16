import express from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import bodyParser from "body-parser";
import LikeController from "./controllers/LikeController";

const app = express();
mongoose.connect('mongodb+srv://kimrine:kimrine123@cluster0.x1j4c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({
    extended: true
}));

//app.use(express.json);

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

const PORT = 4000;
app.listen(process.env.PORT || PORT);