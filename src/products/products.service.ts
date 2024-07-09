import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { generateRandomSKU } from '../utils/sku-generator';
import { Prisma } from '@prisma/client';


@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    }); 
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    let sku = generateRandomSKU();
    while (await this.isSKUExists(sku)) {
      sku = generateRandomSKU();
    }

    return this.prisma.product.create({
      data: {
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date(),
        sku,
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

  private async isSKUExists(sku: string): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    });
    return !!product;
  }

  findAll(query: any) {
    const filters: Prisma.ProductWhereInput = {};

    Object.keys(query).forEach(key => {
      switch (key) {
        case 'categoryId':
          filters.categoryId = +query[key];
          break;
        case 'title':
          filters.title = { contains: query[key], mode: 'insensitive' };
          break;
        case 'description':
          filters.description = { contains: query[key], mode: 'insensitive' };
          break;
        case 'sku':
          filters.sku = { contains: query[key], mode: 'insensitive' };
          break;
        case 'price':
          filters.price = +query[key];
          break;
      }
    });

    return this.prisma.product.findMany({
      where: filters,
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, ...productData } = updateProductDto;
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        updatedAt: new Date(),
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });
  }

  async remove(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.prisma.product.delete({
      where: { id },
    });
  }
}