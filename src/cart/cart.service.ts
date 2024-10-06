import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { SaveCartDto } from './dto/save-cart.dto';
import { Product } from '../products/entities/product.entity';
import { JwtAuthData } from 'src/auth/dto/jwt-auth-data.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async saveCart(
    saveCartDto: SaveCartDto,
    userData: JwtAuthData,
  ): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { user_id: userData.sub },
      relations: ['items', 'items.product'],
    });

    if (!cart) {
      const newCart = this.cartRepository.create({
        user_id: userData.sub,
      });
      return await this.cartRepository.save(newCart);
    }

    // Получаем все продукты за один запрос
    const productIds = saveCartDto.items.map((item) => item.productId);
    const products = await this.productRepository.findByIds(productIds);

    // Создаем мапу для быстрого доступа к продуктам
    const productMap = new Map(
      products.map((product) => [product.id, product]),
    );

    // Создаем массив для новых элементов корзины
    const newCartItems = [];

    for (const item of saveCartDto.items) {
      const product = productMap.get(item.productId);
      if (!product) continue; // Если продукт не найден, пропускаем

      const cartItem = cart.items.find((ci) => ci.product.id === product.id);

      if (cartItem) {
        cartItem.quantity = item.quantity;
        newCartItems.push(cartItem); // Обновляем элемент
      } else {
        const newCartItem = this.cartItemRepository.create({
          cart: cart,
          product: product,
          quantity: item.quantity,
        });
        newCartItems.push(newCartItem); // Добавляем новый элемент
      }
    }

    // Пакетная обработка сохранения
    await this.cartItemRepository.save(newCartItems);

    return cart;
  }

  async getCart(userData: JwtAuthData): Promise<Cart> {
    return await this.cartRepository.findOne({
      where: { user_id: userData.sub },
      relations: ['items', 'items.product'],
    });
  }

  async clearCart(userData: JwtAuthData): Promise<void> {
    const cart = await this.getCart(userData);

    // Удаляем все элементы из корзины
    await this.cartItemRepository.delete({ cart: { id: cart.id } });
  }
}
