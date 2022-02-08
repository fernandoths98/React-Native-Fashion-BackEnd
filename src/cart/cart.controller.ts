import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CartService } from './cart.service';
import { AddItemCartDto } from './Dto/add-item-cart.dto';
import { EditQuantityDto } from './Dto/edit-quantity.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addItemToCart(
    @GetCurrentUserId() userId: number,
    @Body() addItemCartDto: AddItemCartDto,
  ): Promise<any> {
    // console.log({userId, addItemCartDto})
    return this.cartService.addItemToCart(userId, addItemCartDto);
  }

  @Get()
  async getCart(@GetCurrentUserId() userId: number): Promise<any> {
    return this.cartService.getCart(userId);
  }

  @Post('/editQty/:id')
  async getCartById(
    @Param('id') idCart: number,
    @Body() editQuantityDto: EditQuantityDto,
  ): Promise<any> {
    return this.cartService.editQtyByid(idCart, editQuantityDto);
  }
}
