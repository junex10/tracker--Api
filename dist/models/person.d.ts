import { Model } from "sequelize-typescript";
export declare class Person extends Model {
    name: string;
    lastname: string;
    user_id: number;
    phone: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
