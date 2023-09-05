import { Model } from "sequelize-typescript";
export declare class CompanyInformation extends Model {
    name: string;
    client: string;
    document: string;
    email: string;
    phone: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
