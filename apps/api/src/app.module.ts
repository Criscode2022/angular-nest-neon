import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'node:path';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        join(__dirname, '..', '.env'),
        join(__dirname, '..', '..', '..', '.env'),
      ],
    }),
    CommonModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
