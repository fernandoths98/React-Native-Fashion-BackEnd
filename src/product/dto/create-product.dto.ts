import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    title_product: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    size: string;
}