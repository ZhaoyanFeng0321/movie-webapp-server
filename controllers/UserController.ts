import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;

    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users',this.findAllUsers);
        this.app.get('/users/:userid',this.findUserById);
        this.app.post('/users',this.createUser);
        this.app.delete('/users/:userid',this.deleteUser);
        this.app.put('/users/:userid',this.updateUser);
    }

    findAllUsers = (req: Request, res: Response) =>
        this.userDao.findAllUsers()
            .then(users => res.json(users));

    findUserById=(req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)
            .then(user=>res.json(user));

    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status=>res.json(status));

    updateUser=(req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid,req.body)
            .then(status=>res.json(status));

}