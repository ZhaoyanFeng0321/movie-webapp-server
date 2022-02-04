const express = require('express');
const app = express();

import mongoose from "mongoose";
mongoose.connect('mongodb://localhost:27017/tuit-db');

import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";

require('./controllers/UserController')(app,new UserDao());
require('./controllers/TuitController')(app,new TuitDao());

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT);
