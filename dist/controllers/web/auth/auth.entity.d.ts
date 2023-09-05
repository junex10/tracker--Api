export declare class LoginParams {
    email: string;
    password: string;
}
export declare class RegisterParams {
    name?: string;
    lastname?: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    level_id?: number;
    verified?: number;
}
export declare class RecoverParams {
    email: string;
}
export declare class CheckCodeParams {
    code: string;
}
export declare class ResetParams {
    password: string;
    password_confirmation: string;
    code: string;
}
export declare class VerifyUserDTO {
    url: string;
}
export declare class PermissionDTO {
    token: string;
    code: string;
}
export declare class VerifyEmailDTO {
    email: string;
}
export declare class PagesDTO {
    pages: number;
}
