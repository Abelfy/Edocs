import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";

@Entity()
export class User extends AbstractEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(type => Role, role => role.users)
    role: Role;
}
