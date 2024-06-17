import { Software } from "src/softwares/entities/software.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Functionnality } from "../functionnalities/entities/functionnality.entity";
import { Item } from "../items/entities/item.entity";
import { Tracability } from "./tracability.entity";
import { Risk } from "../functionnalities/risks/entities/risk.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";

@Entity()
export class Version extends AbstractEntity {
    @Column({})
    jiraID: number;

    @Column({})
    major: number;

    @Column({})
    minor: number;

    @Column({})
    patch: number;

    @Column({
        length: 250,
    })
    description: string;


    @ManyToOne(type => Software, software => software.versions, {onDelete: 'CASCADE'})
    software: Software;

    @OneToMany(type => Functionnality, functionnality => functionnality.version)
    functionnalities: Functionnality[];

    @OneToMany(type => Risk, functionnality => functionnality.version)
    risks: Risk[];

    @OneToMany(type => Item, item => item.version)
    items: Item[];

    // Tracability
    @OneToMany(type => Tracability, tracability => tracability.version)
    tracabilities : Tracability[];
}

