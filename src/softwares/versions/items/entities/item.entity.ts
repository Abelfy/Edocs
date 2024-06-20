import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Version } from "../../entities/version.entity";
import { Unit } from "../units/entities/unit.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";

@Entity()
export class Item  extends AbstractEntity {
    @Column({
        unique: true
    })
    jiraID: number;
    @Column()
    label: string;

    @Column()
    description: string;

    @ManyToOne(() => Version, version => version.items)
    version: Version;

    @OneToMany(() => Unit, unit => unit.item)
    units: Unit[];
}
