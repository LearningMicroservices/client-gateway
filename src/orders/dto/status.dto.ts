import { OrderStatus } from '../enum/oders.enum';
import { IsEnum } from 'class-validator';

export class StatusDto {
  @IsEnum(OrderStatus)
  readonly status: OrderStatus;
}
