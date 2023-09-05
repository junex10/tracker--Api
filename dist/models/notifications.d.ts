import { Model } from "sequelize-typescript";
export declare class Notifications extends Model {
    title: string;
    message: string;
    receiver_id: number;
    sender_id: number;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
