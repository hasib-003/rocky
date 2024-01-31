import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number; // Unique identifier for the user

    @Column({ unique: true })
    email: string; // User's email address

    @Column({ unique: true })
    username: string; // User's username

    @Column()
    password: string; // User's password
}
