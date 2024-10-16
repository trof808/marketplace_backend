import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Public } from '../shared/publicMetadata';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get('search')
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Filter items by title',
    type: String,
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'Filter items by id',
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  search(
    @Query('title') title?: string,
    @Query('id') id?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const idArray = id ? id.split(',').map(item => parseInt(item, 10)) : [];
    return this.productsService.search(title, idArray, page, limit);
  }
}
