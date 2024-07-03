import { Module } from '@nestjs/common';
import { MicroserviceService } from './microservice.service';
import { MicroserviceController } from './microservice.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "../project/entities/project.entity";
import {ProjectService} from "../project/project.service";
import {Microservice} from "./entities/microservice.entity";
import {Server} from "../server/entities/server.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Project, Microservice, Server])],
  controllers: [MicroserviceController],
  providers: [MicroserviceService, ProjectService],
})
export class MicroserviceModule {}
