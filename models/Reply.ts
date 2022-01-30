import Tuit from "./Tuit";
import User from "./User";

export default class Reply {
    private tuit: Tuit | null = null;
    private text: String = '';
    private repliedOn: Date = new Date();
    private repliedBy: User | null = null;
}