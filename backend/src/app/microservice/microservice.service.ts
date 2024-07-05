import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateMicroserviceDto} from './dto/create-microservice.dto';
import {UpdateMicroserviceDto} from './dto/update-microservice.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Microservice, MicroserviceType} from "./entities/microservice.entity";
import {Repository} from 'typeorm';
import {ProjectService} from '../project/project.service';
import {GetAllMicroservicesDto} from './dto/get-all-microservices.dto';
import {GetMicroserviceDto} from "./dto/get-microservice.dto";
import axios from "axios";
import {RemoveMicroserviceDto} from "./dto/remove-microservice.dto";

@Injectable()
export class MicroserviceService {
    constructor(
        @InjectRepository(Microservice)
        private readonly microserviceRepository: Repository<Microservice>,
        private readonly projectService: ProjectService,
    ) {
    }

    async isCreate(id: string) {
        const microservice = await this.microserviceRepository.findOneBy({id})
        return !!microservice;
    }

    async create(createMicroserviceDto: CreateMicroserviceDto) {
        const isProjectExist = await this.projectService.isCreate(createMicroserviceDto.projectId);

        if (!isProjectExist)
            throw new BadRequestException('The project doesn\'t exist!');

        const isMicroserviceExist = await this.microserviceRepository.findOne({
            where: {
                name: createMicroserviceDto.name,
                project: {id: createMicroserviceDto.projectId}
            }
        });

        if (isMicroserviceExist)
            throw new BadRequestException('The microservice already exist!');

        const newMicroservice = {
            project: {id: createMicroserviceDto.projectId},
            name: createMicroserviceDto.name,
            type: createMicroserviceDto.type,
            content: createMicroserviceDto.content,
        };

        const res = await this.microserviceRepository.save(newMicroservice);
        return {microserviceID: res.id}
    }

    async findAll(getAllMicroservicesDto: GetAllMicroservicesDto) {
        const isProjectExist = await this.projectService.isCreate(getAllMicroservicesDto.projectId);

        if (!isProjectExist)
            throw new BadRequestException('The project doesn\'t exist!');

        return await this.microserviceRepository.find({
            where: {
                project: {id: getAllMicroservicesDto.projectId}
            }
        });
    }

    async findOne(getMicroserviceDto: GetMicroserviceDto) {
        const isCreate = await this.isCreate(getMicroserviceDto.id)

        if (!isCreate)
            throw new BadRequestException('The microservice doesn\'t exist!');

        const microservice = await this.microserviceRepository.findOne({
            where: {id: getMicroserviceDto.id},
            relations: {
                project: true,
                servers: true
            }
        });

        const servers = microservice.servers.map((server) => ({url: server.url, description: server.description}));

        if (microservice.type === MicroserviceType.URL) {
            try {
                const response = await axios.get(microservice.content, {
                    auth: {
                        username: "Admin",
                        password: "P@ssw0rd"
                    }
                });
                response.data.servers = servers
                microservice.content = response.data;
                await this.microserviceRepository.update(microservice.id, {
                    cache: response.data
                })
            } catch (error) {
                if (microservice.cache)
                    microservice.content = microservice.cache;
                else
                    microservice.content = error.message;
            }
        } else {
            const content = JSON.parse(microservice.content)
            content.servers = servers
            microservice.content = JSON.stringify(content)
        }

        return microservice;
    }

    update(id: number, updateMicroserviceDto: UpdateMicroserviceDto) {
        return `This action updates a #${id} microservice`;
    }

    async remove(removeMicroserviceDto: RemoveMicroserviceDto) {
        const isExist = await this.microserviceRepository.findOne({
            where: {
                id: removeMicroserviceDto.id,
            }
        });

        if (!isExist)
            throw new BadRequestException('The microservice doesn\'t exist!');

        await this.microserviceRepository.delete(removeMicroserviceDto.id)
    }
}
