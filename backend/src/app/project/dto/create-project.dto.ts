import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty({description: "Название проекта", example: "Атом.Дока"})
    @IsString()
    name: string

    @ApiProperty({description: "Описание проекта", example: "Система с использованием LLM нейросети для ответов на вопросы, используя контекст базы знаний и ранее успешно решенных вопросов"})
    @IsString()
    description: string

    @ApiProperty({description: "Эмодзи проекта", example: "👋"})
    @IsString()
    emoji: string
}
