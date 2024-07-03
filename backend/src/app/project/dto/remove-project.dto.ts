import {IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RemoveProjectDto {
    @ApiProperty({description: "ID проекта", type: "string", format: "uuid"})
    @IsUUID()
    id: string
}
