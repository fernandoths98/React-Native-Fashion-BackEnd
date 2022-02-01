import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddItemCartDto } from './Dto/add-item-cart.dto';
import { Cart } from './models/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async addItemToCart(
    userId: number,
    addItemCartDto: AddItemCartDto,
  ) {
    return await this.cartRepository.save({
      quantity: addItemCartDto.quantity,
      product: {
        id: addItemCartDto.productId,
      },
      user: {
        id: userId,
      },
      size_product: addItemCartDto.size,
      image_product: addItemCartDto.image,
      price: addItemCartDto.price,
    });
  }

  // const addCartItem = await this.cartRepository.findOne({
  //   where: {
  //     product: {
  //       id: addItemCartDto.productId,
  //     },
  //     user: {
  //       id: userId,
  //     },
  //   },
  // });
}
