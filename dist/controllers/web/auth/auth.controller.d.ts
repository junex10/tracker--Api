/// <reference types="multer" />
import { Response } from 'express';
import { LoginParams, RegisterParams, RecoverParams, CheckCodeParams, ResetParams, VerifyUserDTO, PermissionDTO } from './auth.entity';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: LoginParams, response: Response): Promise<Response<any, Record<string, any>>>;
    register(request: RegisterParams, response: Response, file: Express.Multer.File): Promise<Response<any, Record<string, any>>>;
    recover(request: RecoverParams, response: Response): Promise<Response<any, Record<string, any>>>;
    checkCode(request: CheckCodeParams, response: Response): Promise<Response<any, Record<string, any>>>;
    reset(request: ResetParams, response: Response): Promise<Response<any, Record<string, any>>>;
    modules(params: any, response: Response): Promise<Response<any, Record<string, any>>>;
    verify(response: Response, request: VerifyUserDTO): Promise<Response<any, Record<string, any>>>;
    checkPermissions(response: Response, request: PermissionDTO): Promise<Response<any, Record<string, any>>>;
}
