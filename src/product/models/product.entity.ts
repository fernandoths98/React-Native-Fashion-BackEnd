import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Images } from "./image.entity";


enum SizeProductEnum {
    'S' = 'S',
    'M' = 'M',
    'L' = 'L',
    'XL' = 'XL',
    'XXL' = 'XXL'    
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title_product: string;

    @OneToMany(type => Images, images => images.product_data, {cascade: true})
    image_product: Images[];

    @Column({
    type: 'enum', enum: SizeProductEnum})
    size: string;

    @Column()
    description: string;

    @Column()
    price: number;
}