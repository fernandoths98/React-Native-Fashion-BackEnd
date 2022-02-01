import { Body, Controller, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CartService } from './cart.service';
import { AddItemCartDto } from './Dto/add-item-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addItemToCart(
    @GetCurrentUserId() userId: number,
    @Body() addItemCartDto: AddItemCartDto
  ): Promise<any> {
      
    // console.log({userId, addItemCartDto})
      return this.cartService.addItemToCart(userId, addItemCartDto);
  }
}
