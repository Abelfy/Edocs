import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Version } from "../../entities/version.entity";
import { Tracability } from "../../entities/tracability.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";


@Entity()
export class Functionnality extends AbstractEntity{
    @Column({
        unique: true
    })
    jiraID: number;

    @Column()
    label: string;

    @Column()
    description: string;

    @ManyToOne(() => Version, version => version.functionnalities)
    version: Version;

    /**
     *
     *
     * @type {Tracability[]}
     * @memberof Functionnality
     */
    @OneToMany(type => Tracability, tracability => tracability.version)
    tracabilities : Tracability[];
}
