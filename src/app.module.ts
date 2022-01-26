import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { RtStrategy } from './auth/Jwt/rt.strategy';
import { AtStrategy } from './auth/Jwt/at.strategy';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';

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
    PrismaModule,
    AuthModule],
  controllers: [AppController, AuthController], 
  providers: [AppService, AtStrategy, RtStrategy],
})
export class AppModule {}
