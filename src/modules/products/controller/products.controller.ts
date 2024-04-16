import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  Query,
  Put,
} from '@nestjs/common';

import { Product } from '../entity/product.entity';
import { CreateProduct, UpdateProduct } from '../dto';
import { ProductsService } from '../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get(':id')
  getProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Get()
  getProducts(@Query() filterQuery): Promise<Product[]> {
    const { searchTerm, orderBy } = filterQuery;
    return this.productService.getProducts();
  }

  @Post()
  createProduct(@Body() CreateProduct: CreateProduct): Promise<Product> {
    return this.productService.createProduct(CreateProduct);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() product: UpdateProduct,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Put(':id')
  updateProduct1(
    @Param('id') id: number,
    @Body() product: UpdateProduct,
  ): Promise<Product> {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: number): Promise<string> {
    return this.productService.removeProduct(id);
  }
}
