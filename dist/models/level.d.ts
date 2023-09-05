import { Model } from "sequelize-typescript";
import { Permissions } from '.';
export declare class Level extends Model {
    name: string;
    code: string;
    permissions: Permissions[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
