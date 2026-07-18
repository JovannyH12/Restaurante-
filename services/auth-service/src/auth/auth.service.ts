import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El email ya esta registrado');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ ...dto, password_hash: hash });
    const saved = await this.usersRepo.save(user);

    const { password_hash, ...result } = saved as any;
    return { message: 'Usuario registrado exitosamente', usuario: result };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciales invalidas');

    const valid = await bcrypt.compare(dto.password, user.password_hash);
    if (!valid) throw new UnauthorizedException('Credenciales invalidas');

    const payload = { sub: user.id_usuario, email: user.email, rol: user.rol };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    };
  }

  async getProfile(userId: number) {
    const user = await this.usersRepo.findOne({ where: { id_usuario: userId } });
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    const { password_hash, ...result } = user as any;
    return result;
  }
}
