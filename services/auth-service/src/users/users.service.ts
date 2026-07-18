import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: number) {
    return this.repo.findOne({ where: { id_usuario: id } });
  }

  async findAll() {
    return this.repo.find({
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
        activo: true,
        fecha_registro: true,
      },
    });
  }
}
