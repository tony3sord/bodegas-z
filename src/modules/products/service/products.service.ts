import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { Product } from '../entity/product.entity';
import { CreateProduct, UpdateProduct } from '../dto/index';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async getProducts(): Promise<Product[]> {
    const product = await this.productRepository.find();
    if (!product) {
      throw new NotFoundException('No existen Productos');
    }
    return product;
  }

  async createProduct({
    name,
    price,
    amount,
    description,
  }: CreateProduct): Promise<Product> {
    const product: Product = this.productRepository.create({
      name,
      price,
      amount,
      description,
    });
    if (product) {
      return await this.productRepository.save(product);
    }
    throw new NotAcceptableException('No se pudo crear este producto');
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProduct,
  ): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException('No existe el Producto');
    }

    return this.productRepository.save(product);
  }

  async removeProduct(id: number): Promise<string> {
    const product = await this.productRepository.findOne({ where: { id: id } });
    if (product) {
      await this.productRepository.remove(product);
      return 'Producto eliminado correctamente';
    }
    throw new NotFoundException('No existe');
  }
}
