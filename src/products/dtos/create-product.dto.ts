import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A high-performance laptop' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 999.99 })
  @IsNumber()
  price: number;

  @IsNumber()
  categoryId: number;

}