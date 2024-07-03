import {Module} from '@nestjs/common';
import {ServerService} from './server.service';
import {ServerController} from './server.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Microservice} from "../microservice/entities/microservice.entity";
import {Server} from "./entities/server.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Server, Microservice])],
    controllers: [ServerController],
    providers: [ServerService],
})
export class ServerModule {
}
