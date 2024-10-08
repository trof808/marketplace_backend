import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity'; // Adjust the path as necessary
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { formatProduct } from './utils/formatProducts'

export interface PaginatedResponse<T> {
  products: T[];
  total: number;
  page: number;
}

export interface FormattedProduct {
  id: number;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  categoryId: number;
  availableCount: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<Product>> {
    const [products, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      products,
      total,
      page,
    };
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async search(
    title: string = '',
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedResponse<FormattedProduct>> {
    const [products, total] = await this.productRepository.findAndCount({
      where: { title: Like(`%${title}%`) }, // Use 'Like' for partial matching
      take: limit,
      skip: (page - 1) * limit,
    });

    const formattedProducts = products.map(formatProduct);

    return {
      products: formattedProducts,
      total,
      page,
    };
  }
}
