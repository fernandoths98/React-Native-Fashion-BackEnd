import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title_product: string;

    @Column()
    image_product: string;

    @Column()
    size_id: number;

    @Column()
    size_product: number;

    @Column()
    description: string;
}