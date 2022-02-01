import { Cart } from "src/cart/models/cart.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    hashedRt?: string;

    @OneToMany(type => Cart, (cart) => cart.user)
    carts: Cart[];
}