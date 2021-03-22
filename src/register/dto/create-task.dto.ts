import {IsNotEmpty, IsOptional} from 'class-validator'

export class CreateRegisterDto {
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    local: string;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    rg: string;

    @IsNotEmpty()
    firstPhone: string;

    @IsOptional()
    secondPhone?: string;

}

