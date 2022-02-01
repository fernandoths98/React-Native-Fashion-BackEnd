import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_filename: string;

    @ManyToOne(type => Product, product => product.image_product, {onDelete: 'CASCADE'})
    product_data: Product
}