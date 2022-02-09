import {
  editFilenameImage,
  imageExtFilter,
} from './../common/helpers/image.helper';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
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

  @Public()
  @Get()
  async all(): Promise<Product[]> {
    return await this.productService.all();
  }

  @Public()
  @Get(':id')
  async getProductById(@Param('id') id: number) {
    // console.log('Error :', id);

    return await this.productService.findOne(id);

    //create table size (product one to many size)
  }

  @Public()
  @Get('search/:title')
  async search(@Param('title') title: string) {
    return await this.productService.search(title);
  }

  @Public()
  @Get('image/:imageUri')
  async getImageUri(@Param('imageUri') imageUri: string, @Res() res) {
    return res.sendFile(imageUri, { root: './uploadImages/product' });
  }

  @Public()
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: './uploadImages/product',
        filename: editFilenameImage,
      }),
      fileFilter: imageExtFilter,
    }),
  )
  async createProduct(
    @Body() productDto: CreateProductDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ): Promise<any> {
    // console.log(productDto, files);
    return await this.productService.createProduct(productDto, files);
    //  console.log(files);
  }
}
