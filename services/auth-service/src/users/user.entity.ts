import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  CLIENTE = 'cliente',
  MESERO = 'mesero',
  ADMIN = 'admin',
}

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 15, nullable: true })
  telefono: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENTE })
  rol: UserRole;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  fecha_registro: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
