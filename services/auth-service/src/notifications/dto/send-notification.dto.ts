import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({ example: '+527712345678' })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 'Hola! Tu reservacion esta confirmada.' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
