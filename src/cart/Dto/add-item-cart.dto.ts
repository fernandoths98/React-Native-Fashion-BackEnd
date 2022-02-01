import { IsNotEmpty } from "class-validator";

export class AddItemCartDto {
    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    quantity: number;

    size?: string;

    image?: string;

    price?:number;
}