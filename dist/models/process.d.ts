import { Model } from "sequelize-typescript";
export declare class Process extends Model {
    description: string;
    link: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
