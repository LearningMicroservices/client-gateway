import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsPositive } from 'class-validator';
import { OrderStatus } from '../enum/oders.enum';

export class CreateOrderDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  readonly totalAmount: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  readonly totalItems: number;

  @IsEnum(OrderStatus)
  readonly status: OrderStatus = OrderStatus.PENDING;
}
