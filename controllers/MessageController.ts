/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageControllerI from "../interfaces/messages/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages/sent to retrieve all the messages user sent
 *     </li>
 *     <li>GET /api/users/:uid/messages/received to retrieve all the messages user received
 *     </li>
 *     <li>Get /api/users/:uid1/messages/:uid2 to retrieve all messages user1 sent to user2
 *     </li>
 *     <li>POST /api/users/:uid1/messages/:uid2 to record that user1 send message to user2
 *     </li>
 *     <li>DELETE /api/messages/:mid to remove a particular message instance
 *     </li>
 *     <li> DELETE /api/messages to remove all message instances
 *     * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing follow CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {


    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance = (app: Express): MessageController => {

        if (MessageController.messageController == null) {
            MessageController.messageController = new MessageController();

            app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessageUserSent);
            app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessageUserReceived);
            app.get("/api/users/:uid1/messages/:uid2", MessageController.messageController.findAllMessageUserSentToAnotherUser);

            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userSendsMessage);
            app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
            app.delete("/api/messages", MessageController.messageController.deleteAllMessages);

        }
        return MessageController.messageController;

    }

    private constructor() {
    }

    /**
     * Retrieves all messages that user sent
     * @param {Request} req Represents request from client, including the path
     * parameter uid identifying the foreign key from of message to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessageUserReceived = async (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessageUserReceived(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages that user received
     * @param {Request} req Represents request from client, including the path
     * parameter uid identifying the foreign key to of message to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessageUserSent = async (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessageUserSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages that user1 sent to user2
     * @param {Request} req Represents request from client, including the path
     * parameter uid1 and uid2 identifying the foreign key from and to of message to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessageUserSentToAnotherUser = async (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessageUserSentToAnotherUser(req.params.uid1, req.params.uid2)
            .then(messages => res.json(messages));

    /**
     * Delete a message in database and returns status of delete.
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a message was successful or not
     */
    userDeletesMessage = async (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.json(status));


    /**
     * Create a new message with sender user1 and receiver user2.
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage = async (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.uid1, req.params.uid2, req.body)
            .then(message => res.json(message));

    /**
     * Delete all messages in database and returns status of delete.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting messages was successful or not
     */
    deleteAllMessages = async (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessages()
            .then(status => res.json(status));


}
