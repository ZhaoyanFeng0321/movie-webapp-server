import {Request,Response} from "express";

export default interface MessageControllerI{

    findAllMessageUserSent(req: Request,res:Response): void;

    findAllMessageUserReceived(req: Request,res:Response): void;

    findAllMessageUserSentToAnotherUser(req: Request,res:Response): void;

    userSendsMessage(req: Request,res:Response): void;

    userDeletesMessage(req: Request,res:Response): void;

    deleteAllMessages(req: Request,res:Response): void;


}