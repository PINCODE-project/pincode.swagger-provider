import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {MicroserviceService} from "./microservice.service";
import {CreateMicroserviceDto} from "./dto/create-microservice.dto";
import {GetAllMicroservicesDto} from "./dto/get-all-microservices.dto";
import {GetMicroserviceDto} from "./dto/get-microservice.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {RemoveMicroserviceDto} from "./dto/remove-microservice.dto";
import {getBadRequestErrors, getUnauthorizedError} from "../utils/getErrors";

@ApiTags('microservice')
@Controller('microservice')
export class MicroserviceController {
    constructor(
        private readonly microserviceService: MicroserviceService,
    ) {
    }

    @ApiOperation({summary: "Создание нового микросервиса"})
    @ApiResponse(getBadRequestErrors("Неверные данные", [
        {error: "The project doesn't exist!", description: "Проект не найден"},
        {error: "The microservice already exist!", description: "Микросервис уже существует"},
    ]))
    @ApiResponse(getUnauthorizedError())
    @ApiBearerAuth()
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createMicroserviceDto: CreateMicroserviceDto) {
        return this.microserviceService.create(createMicroserviceDto);
    }

    // @ApiOperation({summary: "Получение всех микросервисов проекта"})
    // @ApiResponse(getBadRequestErrors("Неверные данные", [
    //     {error: "The project doesn't exist!", description: "Проект не найден"},
    // ]))
    // @ApiResponse(getUnauthorizedError())
    // @ApiBearerAuth()
    // @Get("/by-project/:projectId")
    // @UseGuards(JwtAuthGuard)
    // findAll(@Param() getAllMicroservicesDto: GetAllMicroservicesDto) {
    //     return this.microserviceService.findAll(getAllMicroservicesDto);
    // }

    @ApiOperation({summary: "Получение информации о микросервисе"})
    @ApiResponse(getBadRequestErrors("Неверные данные", [
        {error: "The microservice doesn't exist!", description: "Микросервис не найден"},
    ]))
    @ApiResponse(getUnauthorizedError())
    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param() getMicroserviceDto: GetMicroserviceDto) {
        return this.microserviceService.findOne(getMicroserviceDto);
    }

    // @ApiBearerAuth()
    // @Patch(':id')
    // @UseGuards(JwtAuthGuard)
    // update(@Param('id') id: string, @Body() updateMicroserviceDto: UpdateMicroserviceDto) {
    //     return this.microserviceService.update(+id, updateMicroserviceDto);
    // }

    @ApiOperation({summary: "Удаление микросервиса"})
    @ApiResponse(getBadRequestErrors("Неверные данные", [
        {error: "The microservice doesn't exist!", description: "Микросервис не найден"},
    ]))
    @ApiResponse(getUnauthorizedError())
    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param() removeMicroserviceDto: RemoveMicroserviceDto) {
        return this.microserviceService.remove(removeMicroserviceDto);
    }
}
