import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WatchModule } from './watch/watch.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, WatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
