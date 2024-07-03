import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {Microservice} from "../../microservice/entities/microservice.entity";

@Entity()
export class Project {
    @ApiProperty({type: "string", format: "uuid"})
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty()
    @Column({default: ""})
    emoji: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Microservice, (microservice) => microservice.project, {nullable: true})
    microservices: Microservice[];
}
