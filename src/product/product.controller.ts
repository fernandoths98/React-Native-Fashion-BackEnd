import {
  editFilenameImage,
  imageExtFilter,
} from './../common/helpers/image.helper';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './models/product.entity';
import { ProductService } from './product.service';
import { Public } from 'src/common/decorators';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all(): Promise<Product[]> {
    return await this.productService.all();
  }

  @Public()
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './uploadImages/product',
        filename: editFilenameImage,
      }),
      fileFilter: imageExtFilter
    }))
  async createProduct(
    @Body() productDto: CreateProductDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    console.log(productDto, files);
    return await this.productService.createProduct(productDto, files);
  //  console.log(files);
}
}
