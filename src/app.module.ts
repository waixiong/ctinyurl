import { Module } from '@nestjs/common';
import { LinkModule } from './module/link/link.module';
import { UrlModule } from './module/url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    UrlModule,
    LinkModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'web'),
    }),
  ],
})
export class AppModule {}
