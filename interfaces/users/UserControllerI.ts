import {Request, Response} from "express";

export default interface UserControllerI {

    findAllUsers(req: Request, res: Response): void;

    findUserById(req: Request, res: Response): void;

    createUser(req: Request, res: Response): void;

    deleteUser(req: Request, res: Response): void;

    updateUser(req: Request, res: Response): void;

    deleteAllUsers(req:Request,res:Response): void;

    deleteUsersByUsername(req:Request,res:Response) : void;

    findUserByUsername(req:Request,res:Response): void;
}