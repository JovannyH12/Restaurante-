import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST', 'localhost'),
        port: config.get<number>('MYSQL_PORT', 3306),
        username: config.get('MYSQL_USER', 'resadmin'),
        password: config.get('MYSQL_PASSWORD', 'reservaciones_pass'),
        database: config.get('MYSQL_DATABASE', 'reservaciones_db'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    NotificationsModule,
  ],
})
export class AppModule {}
