import { PaginationDto } from 'src/common';
import { OrderStatus } from '../enum/oders.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  readonly status?: OrderStatus;
}
