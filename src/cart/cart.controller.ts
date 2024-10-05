import { Controller, Post, Get, Delete, Body, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { SaveCartDto } from './dto/save-cart.dto';
import { Cart } from './entities/cart.entity';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiBody({ type: SaveCartDto })
  @ApiResponse({
    status: 200,
    schema: {},
  })
  async saveCart(
    @Body() saveCartDto: SaveCartDto,
    @Req() request,
  ): Promise<Cart> {
    return this.cartService.saveCart(saveCartDto, request['user']);
  }

  @Get()
  async getCart(@Req() request): Promise<Cart> {
    return this.cartService.getCart(request['user']);
  }

  @Delete()
  async clearCart(@Req() request): Promise<void> {
    return this.cartService.clearCart(request['user']);
  }
}
