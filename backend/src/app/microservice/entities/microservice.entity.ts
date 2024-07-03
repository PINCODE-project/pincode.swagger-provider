import {ApiProperty} from "@nestjs/swagger";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Project} from "../../project/entities/project.entity";
import {Server} from "../../server/entities/server.entity";

export enum MicroserviceType {
    URL = "url",
    SCHEME = "scheme"
}

@Entity()
export class Microservice {
    @ApiProperty()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({type: 'enum', enum: MicroserviceType})
    type: MicroserviceType;

    @ApiProperty()
    @Column({type: 'text', nullable: true})
    content: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Project, (project) => project.id, {nullable: true, onDelete: 'CASCADE',})
    @JoinColumn({ name: 'project'})
    project: Project;

    @OneToMany(() => Server, (server) => server.microservice, {nullable: true, onDelete: 'CASCADE',})
    servers: Server[];
}
