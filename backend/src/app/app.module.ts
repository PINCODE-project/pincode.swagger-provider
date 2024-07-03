import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from './auth/auth.module';
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {ProjectModule} from "./project/project.module";
import {MicroserviceModule} from "./microservice/microservice.module";
import {ServerModule} from "./server/server.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                username: configService.get("DB_USERNAME"),
                password: configService.get("DB_PASSWORD"),
                database: configService.get("DB_NAME"),
                synchronize: true,
                entities: [__dirname + "/**/*.entity{.js, .ts}"]
            }),
            inject: [ConfigService]
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', '..', 'static'),
            serveRoot: '/api/static',
        }),
        UserModule,
        ConfigModule.forRoot({isGlobal: true}),
        AuthModule,
        ProjectModule,
        MicroserviceModule,
        ServerModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
