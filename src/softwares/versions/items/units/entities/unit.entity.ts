import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "../../entities/item.entity";
import { Tracability } from "src/softwares/versions/entities/tracability.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";

@Entity()
export class Unit extends AbstractEntity {
    @Column({
        unique: true
    })
    jiraID: number;
    @Column()
    label: string;

    @Column()
    description: string;

    @ManyToOne(() => Item, item => item.units)
    item: Item;

    @OneToMany(type => Tracability, tracability => tracability.version)
    tracabilities : Tracability[];
}
