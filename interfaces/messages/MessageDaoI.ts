import Message from "../../models/messages/Message";

export default interface MessageDaoI{

    findAllMessageUserSent(uid:string): Promise<Message[]>;

    findAllMessageUserReceived(uid:string): Promise<Message[]>;

    findAllMessageUserSentToAnotherUser(uid1:string,uid2:string): Promise<Message[]>;

    userSendsMessage(uid1:string,uid2:string, message: Message): Promise<Message>;

    userDeletesMessage(mid:string): Promise<any>;

    deleteAllMessages(): Promise<any>;



}