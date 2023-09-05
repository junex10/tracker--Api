import { Model } from "sequelize-typescript";
import { User, ChatSession } from '.';
export declare class Chats extends Model {
    chat_session: ChatSession;
    sender: User;
    sender_id: number;
    chat_session_id: number;
    message: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
