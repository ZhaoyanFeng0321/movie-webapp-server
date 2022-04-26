import User from "../../models/users/User";
import Movie from "../../models/movies/Movie";

export default interface UserDaoI {

    findAllUsers(): Promise<User[]>;

    findUserById(uid: string): Promise<any>;

    createUser(user: User): Promise<User>;

    updateUser(uid: string, user: User): Promise<any>;

    deleteUser(uid: string): Promise<any>;

    deleteAllUsers(): Promise<any>;

    deleteUsersByUsername(username: string) : Promise<any>;

    findUserByUsername(username: string): Promise<any>;

}