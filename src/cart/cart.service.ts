import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddItemCartDto } from './Dto/add-item-cart.dto';
import { EditQuantityDto } from './Dto/edit-quantity.dto';
import { Cart } from './models/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
  ) {}

  async addItemToCart(userId: number, addItemCartDto: AddItemCartDto) {
    return await this.cartRepository.save({
      quantity: addItemCartDto.quantity,
      product: {
        id: addItemCartDto.productId,
      },
      user: {
        id: userId,
      },
      size_product: addItemCartDto.size,
      title_product: addItemCartDto.title_product,
      image_product: addItemCartDto.image,
      price: addItemCartDto.price,
    });
  }

  async getCart(userId: number) {
    return await this.cartRepository.find({
      relations: ['product', 'user'],
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async getCartById(idCart: number) {
    return await this.cartRepository.findOne(idCart);
  }

  async editQtyByid(idCart: number, editQty: EditQuantityDto) {
    return await this.cartRepository.update(idCart, {
      quantity: editQty.quantity,
    });
  }
}
