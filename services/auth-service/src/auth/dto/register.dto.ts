import { IsString, IsEmail, IsOptional, MinLength, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../users/user.entity';

export class RegisterDto {
  @ApiProperty({ example: 'Jovanny' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Hernandez' })
  @IsString()
  apellido: string;

  @ApiProperty({ example: 'jovanny@email.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: '7712345678' })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'MiPassword123!' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.CLIENTE })
  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole;
}
