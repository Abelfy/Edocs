import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


export class AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    createdBy: number;

    @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
    createdAt: Date

    @ManyToOne(type => User)
    updatedBy: number;

    @UpdateDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    updatedAt: Date

    @ManyToOne(type => User)
    deletedBy: number;

    @DeleteDateColumn({ type: 'timestamp without time zone', onUpdate: 'NOW()', nullable: true })
    deletedAt: Date;
}