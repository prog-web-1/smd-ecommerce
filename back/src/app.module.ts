import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { IsUniqueConstraint } from './validators/unique';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { IsExistsConstraint } from './validators/exists';
import { VendaModule } from './venda/venda.module';
import { RolesGuard } from './auth/guards/role-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_URL,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.DATABASE_TYPE === 'postgres' ? true : undefined,
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    VendaModule,
  ],
  providers: [
    IsUniqueConstraint,
    IsExistsConstraint,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
