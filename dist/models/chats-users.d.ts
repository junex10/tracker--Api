import { Model } from "sequelize-typescript";
import { User, ChatSession } from '.';
export declare class ChatUsers extends Model {
    chat_session: ChatSession;
    sender: User;
    viewed: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
