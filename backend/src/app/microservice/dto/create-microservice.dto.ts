import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsString, IsUUID} from "class-validator";
import {MicroserviceType} from "../entities/microservice.entity";

export class CreateMicroserviceDto {
    @ApiProperty({type: "string", format: "uuid"})
    @IsUUID()
    projectId: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEnum(MicroserviceType)
    type: MicroserviceType

    @ApiProperty()
    @IsString()
    content: string
}
