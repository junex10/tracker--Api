import { Model } from "sequelize-typescript";
import { Actions } from '.';
export declare class Permissions extends Model {
    action_id: number;
    actions: Actions[];
    level_id: number;
}
