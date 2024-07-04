import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RemoveProjectDto} from "./dto/remove-project.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {getBadRequestErrors, getUnauthorizedError} from "../utils/getErrors";

@ApiTags('project')
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {
    }

    @ApiOperation({summary: "Создание нового проекта"})
    @ApiResponse(getBadRequestErrors("Неверные данные", [
        {error: "The project already exist!", description: "Проект уже существует"},
    ]))
    @ApiResponse(getUnauthorizedError())
    @ApiBearerAuth()
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.create(createProjectDto);
    }

    @ApiOperation({summary: "Получение всех проектов"})
    @ApiResponse(getUnauthorizedError())
    @ApiBearerAuth()
    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    // @ApiBearerAuth()
    // @Patch(':id')
    // @UseGuards(JwtAuthGuard)
    // update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    //     return this.projectService.update(+id, updateProjectDto);
    // }

    @ApiOperation({summary: "Удаление проекта"})
    @ApiResponse(getBadRequestErrors("Неверные данные", [
        {error: "The project doesn't exist!", description: "Проект не найден"},
    ]))
    @ApiResponse(getUnauthorizedError())
    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param() removeProjectDto: RemoveProjectDto) {
        return this.projectService.remove(removeProjectDto);
    }
}
