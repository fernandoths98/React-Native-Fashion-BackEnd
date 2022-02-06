import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from 'src/size/size.entity';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['image_product', 'size'],
    });
  }

  async findOne(id: number) {
    // console.log("Error :",id);

    return await this.productRepository.findOne(id, {
      relations: ['image_product', 'size'],
    });
  }

  async getImageUri(imageUri: string) {
    console.log('imageUri', imageUri);
    // return await this.productRepository.findOne(imageUri);
  }

  async search(title: string) {
    const result = await this.productRepository.find({
      relations: ['image_product'],
      where: {
        title_product: Like(`%${title}%`),
      },
    });

    return result;
  }

  async createProduct(
    productDto: CreateProductDto,
    image: any,
  ): Promise<Product> {
    let productData = new Product();
    productData.title_product = productDto.title_product;
    productData.description = productDto.description;
    productData.price = productDto.price;

    const imagesProduct = image.map((image: any) => {
      //menyimpan data image yang diupload
      return {
        image_filename: image.filename,
      };
    });

    productData.size = await Promise.all(
      productDto.size.map((size) => {
        return this.sizeRepository.findOne({ where: { size: size } });
      }),
    );

    productData.image_product = imagesProduct; //mengambil data dari array image

    return await this.productRepository.save(productData);
  }
}
