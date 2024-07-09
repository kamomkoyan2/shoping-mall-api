import { Module, OnModuleInit } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    PrismaModule,
    ProductsModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.category.createMany({
      data: [
        { title: 'Electronics', description: 'Electronic items' },
        { title: 'Books', description: 'Books and literature' },
        { title: 'Clothing', description: 'Apparel and accessories' },
        { title: 'Toys', description: 'Toys and games' },
        { title: 'Groceries', description: 'Food and beverages' },
        { title: 'Beauty', description: 'Beauty and personal care' },
        { title: 'Sports', description: 'Sports and outdoor equipment' },
        { title: 'Home', description: 'Home and kitchen appliances' },
        { title: 'Automotive', description: 'Automotive and parts' },
        { title: 'Health', description: 'Health and wellness products' },
      ],
      skipDuplicates: false,
    });
  }
}