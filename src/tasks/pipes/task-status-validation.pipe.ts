import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedstatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`Value ${value} is an invalid status`);
        }
        
        return value;
    }

    private isStatusValid(status: any): Boolean{
        const index = this.allowedstatuses.indexOf(status);
        return index !== -1;
    }
}