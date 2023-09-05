import { Model } from "sequelize-typescript";
import { Level, Person } from '.';
export declare class User extends Model {
    email: string;
    password: string;
    level_id: number;
    level: Level;
    token: string;
    verified: number;
    status: number;
    person: Person;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
