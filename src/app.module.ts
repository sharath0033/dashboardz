import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { credential } from 'firebase-admin';

import { CommonModule } from './common';
import { DashboardModule } from './dashboard';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        credential: credential.cert(configService.get('FIREBASE_ADMIN_CREDENTIALS')),
      }),
      inject: [ConfigService]
    }),
    CommonModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }