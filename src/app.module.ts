import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { PromoCodesModule } from './promo-codes/promo-codes.module';

@Module({
  imports: [AuthModule, ProductsModule, CartModule, UsersModule, PromoCodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
