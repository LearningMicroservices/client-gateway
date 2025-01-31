import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsClient
      .send({ cmd: 'createProduct' }, createProductDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient
      .send({ cmd: 'findAllProducts' }, paginationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  async findProductById(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', 400);
    }
    return this.productsClient.send({ cmd: 'findOneProduct' }, id).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', 400);
    }
    const payload = { ...updateProductDto, id: +id };
    return this.productsClient.send({ cmd: 'updateProduct' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new HttpException('Invalid id', 400);
    }
    return this.productsClient.send({ cmd: 'removeProduct' }, { id: +id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
