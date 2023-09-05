import { Model } from "sequelize-typescript";
export declare class NotificationType extends Model {
    name: string;
    code: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
