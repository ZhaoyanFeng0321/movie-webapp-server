import express from 'express';
import mongoose from "mongoose";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import bodyParser from "body-parser";

const app = express();
mongoose.connect('mongodb+srv://kimrine:kimrine123@cluster0.x1j4c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(bodyParser.urlencoded({
    extended: true
}));

const userController = UserController.getInstance(app);
const tuitController = new TuitController(app, new TuitDao());

app.get('/hello', (req, res) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req, res) => {
    res.send(req.params.a + req.params.b);
})

const PORT = 4000;
app.listen(process.env.PORT || PORT);