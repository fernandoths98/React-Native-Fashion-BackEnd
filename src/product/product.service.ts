import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ){}

    async all(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async createProduct(productDto: CreateProductDto, image: any): Promise<Product> {
        let productData= new Product();
        productData.title_product = productDto.title_product;
        productData.description = productDto.description;
        productData.price = productDto.price;

        const imagesProduct = image.map((image: any) => { //menyimpan data image yang diupload
            return {
                image_filename: image.filename,
            }
        })

        productData.image_product = imagesProduct; //mengambil data dari array image
        productData.size = productDto.size;
        
        return await this.productRepository.save(productData);
    }
}
