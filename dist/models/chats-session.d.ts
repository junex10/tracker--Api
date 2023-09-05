import { Model } from "sequelize-typescript";
import { User } from '.';
export declare class ChatSession extends Model {
    host_id: number;
    host: User;
    status: number;
    name: string;
    attachment: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
