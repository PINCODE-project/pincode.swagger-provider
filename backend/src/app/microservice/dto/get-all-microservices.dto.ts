import {ApiProperty} from "@nestjs/swagger";
import {IsEnum, IsString, IsUUID} from "class-validator";
import {MicroserviceType} from "../entities/microservice.entity";

export class GetAllMicroservicesDto {
    @ApiProperty({type: "string", format: "uuid"})
    @IsUUID()
    projectId: string;
}
