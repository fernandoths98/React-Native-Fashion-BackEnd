import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from 'src/size/size.entity';
import { Images } from './models/image.entity';
import { Product } from './models/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Images, Size])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
