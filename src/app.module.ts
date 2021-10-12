import { Module } from '@nestjs/common';
import { LinkModule } from './module/link/link.module';
import { UrlModule } from './module/url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    UrlModule,
    LinkModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
})
export class AppModule {}
