import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { AbstractEntity } from "src/core/entity/abstract.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User extends AbstractEntity {

    @Column({
        unique: true
    })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(type => Role, role => role.users)
    role: Role;
}
