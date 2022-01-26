import { Controller, Get } from '@nestjs/common';
import { Product } from './models/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){

    }

    @Get()
    async all(): Promise<Product[]>{
        return await this.productService.all();
    }
}
