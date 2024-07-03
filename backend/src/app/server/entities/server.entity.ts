import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Microservice} from "../../microservice/entities/microservice.entity";

@Entity()
export class Server {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    url: string

    @Column()
    description: string

    @ManyToOne(() => Microservice, (microservice) => microservice.id, {nullable: true})
    @JoinColumn({name: 'microservice'})
    microservice: Microservice;
}
