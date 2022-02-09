import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
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
    //console.log(userId);
    return this.cartService.getCart(userId);
  }

  @Get('/:id')
  async getCartByUserId(@GetCurrentUserId() userId: number): Promise<any> {
    console.log(userId);
    // return this.cartService.getCartByUserId(userId);
  }

  @Patch('/editQty/:id')
  async editCartById(
    @Param('id') idCart: number,
    @Body() editQuantityDto: EditQuantityDto,
  ): Promise<any> {
    // console.log(idCart);
    return this.cartService.editQtyByid(idCart, editQuantityDto);
  }

  @Get('/:id')
  async getCartById(@Param('id') idCart: number): Promise<any> {
    return this.cartService.getCartById(idCart);
  }

  @Delete('/users/:id')
  async deleteCart(@GetCurrentUserId() userId: number): Promise<any> {
    return this.cartService.deleteCart(userId);
  }

  @Delete('/:id')
  async deleteCartById(@Param('id') idCart: number): Promise<any> {
    return this.cartService.deleteCartById(idCart);
  }
}
