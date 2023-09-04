import { IsNotEmpty, IsEmail, MinLength, IsUrl, ValidateIf } from "class-validator";
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginParams {
    @ApiProperty({ required: true })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
	email: string;

    @ApiProperty({ required: true })
	password: string;
}
export class RegisterParams {
    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    lastname?: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'El campo email es requerido' })
    @IsEmail({},{ message: 'El correo electrónico no es válido' })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
    email: string;
    
    @ApiProperty({ required: false })
    phone: string;

    @ApiProperty({ required: false })
    @IsNotEmpty({ message: 'El campo contraseña es requerido' })
	@MinLength(6,{ message: 'La contraseña debe tener mínimo 6 caracteres' })
    password: string;

    @ApiProperty({ required: false })
    password_confirmation: string;

    @ApiProperty()
    level_id?: number;

    @ApiProperty()
    verified?: number;
}

export class RecoverParams {
    @ApiProperty({ required: true })
    @Transform(({ value }: TransformFnParams) => value.toLowerCase().trim())
	email: string;
}

export class CheckCodeParams {
    @ApiProperty({ required: true })
	code: string;
}

export class ResetParams {
    @ApiProperty({ required: true })
	@IsNotEmpty({ message: 'El campo nueva contraseña es requerido' })
	@MinLength(6,{ message: 'La contraseña debe tener mínimo 6 caracteres' })
    password: string;

    @ApiProperty({ required: true })
    password_confirmation: string;

    @ApiProperty({ required: true })
    code: string;
}
export class VerifyUserDTO {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'El campo de código es requerido' })
    url: string;
}
export class PermissionDTO {
    @ApiProperty({ required: true })
    token: string;

    @ApiProperty({ required: true })
    code: string;
}
export class VerifyEmailDTO {
    @ApiProperty({ required: true })
    email: string;
}
export class PagesDTO {
    @ApiProperty()
    pages: number;
}