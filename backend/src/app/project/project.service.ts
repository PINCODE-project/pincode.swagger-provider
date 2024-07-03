import {BadRequestException, Injectable} from '@nestjs/common';
import {UpdateProjectDto} from './dto/update-project.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Project} from "./entities/project.entity";
import {CreateProjectDto} from "./dto/create-project.dto";
import {RemoveProjectDto} from "./dto/remove-project.dto";

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {
    }

    async isCreate(id: string) {
        const project = await this.projectRepository.findOneBy({id})
        return !!project;
    }

    async create(createProjectDto: CreateProjectDto) {
        const isExist = await this.projectRepository.findOne({
            where: {
                name: createProjectDto.name,
            }
        });

        if (isExist)
            throw new BadRequestException('The project already exist!');

        const newProject = {
            name: createProjectDto.name,
            description: createProjectDto.description,
            emoji: createProjectDto.emoji
        };

        const res = await this.projectRepository.save(newProject);
        return {projectID: res.id}
    }

    async findAll() {
        return await this.projectRepository.find({
            relations: {
                microservices: true
            },
            select: {
                id: true,
                emoji: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
                microservices: {
                    id: true,
                    name: true,
                    type: true,
                    createdAt: true,
                    updatedAt: true
                },
            }
        });
    }

    findOne(id: number) {
        return `This action returns a #${id} project`;
    }

    update(id: number, updateProjectDto: UpdateProjectDto) {
        return `This action updates a #${id} project`;
    }

    async remove(removeProjectDto: RemoveProjectDto) {
        const isExist = await this.projectRepository.findOne({
            where: {
                id: removeProjectDto.id,
            }
        });

        if (!isExist)
            throw new BadRequestException('The project doesn\'t exist!');

        await this.projectRepository.delete(removeProjectDto.id)
    }
}
