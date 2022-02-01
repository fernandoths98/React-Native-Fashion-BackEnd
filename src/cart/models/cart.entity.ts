import { Product } from "src/product/models/product.entity";
import { User } from "src/user/models/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id_cart: number;

    @Column()
    user_id: number;

    @Column()
    quantity: number;

    @Column()
    size_product: string;

    @Column()
    price: number;

    @Column()
    image_product: string;

    @ManyToOne(() => User, (user) => user.carts)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Product, {onDelete: "CASCADE"})
    @JoinColumn({ name: "product_id" })
    product: Product;
}