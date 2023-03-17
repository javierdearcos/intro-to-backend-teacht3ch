import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('text')
    title: string;
    @Column('text')
    author: string;
    @Column('numeric')
    pages: number;
    @ManyToOne(() => User, {
        eager: true
    })
    user: User;
}