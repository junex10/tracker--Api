import { Model } from "sequelize-typescript";
import { Process, User } from '.';
export declare class Petition extends Model {
    user_id: number;
    process_id: number;
    process: Process;
    user: User;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
