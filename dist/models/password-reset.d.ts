import { Model } from "sequelize-typescript";
export declare class PasswordReset extends Model {
    user_id: number;
    code: string;
    status: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
