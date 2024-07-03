import {IsString, IsUUID} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RemoveMicroserviceDto {
    @ApiProperty({description: "ID микросервиса", type: "string", format: "uuid"})
    @IsUUID()
    id: string
}
