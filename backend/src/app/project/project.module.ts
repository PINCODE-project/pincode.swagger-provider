import {Module} from '@nestjs/common';
import {ProjectService} from './project.service';
import {ProjectController} from './project.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "./entities/project.entity";
import {Microservice} from "../microservice/entities/microservice.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Project, Microservice])],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {
}
