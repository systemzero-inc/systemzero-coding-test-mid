import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './db.service';
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService ],
})
export class AppModule {}
