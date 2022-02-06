import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { ProductModule } from './product/product.module';
import { AuthService } from './auth/auth.service';
import { RtStrategy } from './auth/Jwt/rt.strategy';
import { AtStrategy } from './auth/Jwt/at.strategy';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common';
import { CartModule } from './cart/cart.module';
import { SizeModule } from './size/size.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fashion_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    AuthModule,
    CartModule,
    SizeModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppService,
  ],
})
export class AppModule {}
