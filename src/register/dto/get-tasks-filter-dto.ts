import {IsNotEmpty, IsOptional, IsIn} from 'class-validator'

export class GetTasksFilterDto {

    @IsOptional()
    status: string;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}