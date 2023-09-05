import { Model } from "sequelize-typescript";
import { Modules } from '.';
export declare class Actions extends Model {
    module: Modules;
    main: number;
    name: string;
    code: string;
}
