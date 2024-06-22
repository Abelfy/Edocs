import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    OneToMany,
} from "typeorm";
import { Version } from "./version.entity";
import { Risk } from "../risks/entities/risk.entity";
import { Unit } from "../items/units/entities/unit.entity";
import { Functionnality } from "../functionnalities/entities/functionnality.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";

@Entity()
export class Tracability extends AbstractEntity {

    @ManyToOne(() => Version, version => version.tracabilities)
    version: Version;

    @ManyToOne(() => Risk, risk => risk.tracabilities)
    risk: Risk;

    @ManyToOne(() => Unit , unit => unit.tracabilities)
    unit: Unit;

    @ManyToOne(() => Functionnality , functionnality => functionnality.tracabilities)
    functionnality: Functionnality;
}