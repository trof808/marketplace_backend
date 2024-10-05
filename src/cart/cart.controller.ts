import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { SaveCartDto } from './dto/save-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async saveCart(@Body() saveCartDto: SaveCartDto): Promise<Cart> {
    return this.cartService.saveCart(saveCartDto);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: number): Promise<Cart> {
    return this.cartService.getCart(userId);
  }

  @Delete(':userId')
  async clearCart(@Param('userId') userId: number): Promise<void> {
    return this.cartService.clearCart(userId);
  }
}
