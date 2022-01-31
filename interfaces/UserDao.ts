import User from "../models/User";

export default interface UserDao {

    findAllUsers(): Promise<User[]>;

    findUserById(uid: string): Promise<User>;

    createUser(user: User): Promise<User>;

    updateUser(uid: string, user: User): Promise<any>;

    deleteUser(uid: string): Promise<any>;


}