import { Column, Entity, PrimaryGeneratedColumn , OneToMany } from "typeorm";
import { Version } from "../versions/entities/version.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";

@Entity()
export class Software extends AbstractEntity {

    @Column({})
    jiraID: number;

    @Column({
        length: 100,
        unique: true
    })
    name: string;

    @OneToMany(type => Version, version => version.software, {cascade: true})
    versions: Version[];
}
