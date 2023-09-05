/// <reference types="multer" />
import { User, PasswordReset, Modules, Permissions, Person } from "src/models";
import { MailerService } from '@nestjs-modules/mailer';
import { RecoverParams, ResetParams, RegisterParams } from './auth.entity';
export declare class AuthService {
    private userModel;
    private passwordResetModel;
    private moduleModel;
    private personModel;
    private permissionModel;
    private mailerService;
    constructor(userModel: typeof User, passwordResetModel: typeof PasswordReset, moduleModel: typeof Modules, personModel: typeof Person, permissionModel: typeof Permissions, mailerService: MailerService);
    findUserVerified: (email: string) => Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByPk(user_id: number): Promise<User>;
    getCode(code: string): Promise<PasswordReset>;
    updatePassword(request: ResetParams, user: User, password: PasswordReset): Promise<[number, PasswordReset[]]>;
    recover(request: RecoverParams, user: User): Promise<void>;
    createUser(request: RegisterParams, file: Express.Multer.File): Promise<User>;
    getModules(level: number): Promise<any>;
    verify: (url: string) => Promise<number>;
    checkPermissions: (permissions: string, code: string) => Promise<boolean>;
    private generateURL;
}
