import {IsNotEmpty, IsOptional, IsIn} from 'class-validator'

export class GetRegistersFilterDto {

    @IsOptional()
    fullName: string;

    @IsOptional()
    today: boolean;
}