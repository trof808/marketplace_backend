import { Controller, Post, Get, Delete, Body, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { SaveCartDto } from './dto/save-cart.dto';
import { Cart } from './entities/cart.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/save')
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
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        user_id: 1,
        created_at: '2024-10-05T19:13:23.512Z',
        updated_at: '2024-10-05T19:13:23.512Z',
        items: [
          {
            id: 1,
            quantity: 10,
            created_at: '2024-10-05T19:14:32.525Z',
            updated_at: '2024-10-05T19:14:32.525Z',
            product: {
              id: 3,
              title: 'Fantastic Cotton Pants',
              description:
                'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
              price: 177.89,
              currency: "USD",
              availableCount: 4,
              category_id: null,
              created_at: '2024-10-05T13:48:10.236Z',
              updated_at: '2024-10-05T13:48:10.236Z',
            },
          },
        ],
      },
    },
  })
  async getCart(@Req() request): Promise<Cart> {
    return this.cartService.getCart(request['user']);
  }

  @Delete('/clear')
  async clearCart(@Req() request): Promise<void> {
    return this.cartService.clearCart(request['user']);
  }
}
