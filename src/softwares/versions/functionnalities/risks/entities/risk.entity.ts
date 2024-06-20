
import { AbstractEntity } from "src/core/entity/abstract.entity";
import { Tracability } from "src/softwares/versions/entities/tracability.entity";
import { Version } from "src/softwares/versions/entities/version.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Risk extends AbstractEntity {
    @Column({
        unique: true
    })
    jiraID: number;
    @Column()
    description: string;

    @Column()
    level: number;

    @ManyToOne(() => Version, version => version.risks)
    version: Version;

    // Tracability
    @OneToMany(type => Tracability, tracability => tracability.version)
    tracabilities : Tracability[];
}
