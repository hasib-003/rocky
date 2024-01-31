import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number; // Unique identifier for the product

    @Column()
    title: string; // Title of the product

    @Column()
    description: string; // Description of the product

    @Column()
    status: string
    
    @Column()
    userId:number

    // No additional methods or functionalities added in this class
}
