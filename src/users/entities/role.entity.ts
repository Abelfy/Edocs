import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";

@Entity()
export class Role extends AbstractEntity {

    @Column()
    label: string;

    @Column()
    authorizations: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(type => User, user => user.role)
    users: User[];
}
