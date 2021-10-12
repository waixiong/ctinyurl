import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { LinkService } from '../link/link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LinkSchema } from '../link/link.scheme';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Link', schema: LinkSchema }])],
  controllers: [UrlController],
  providers: [UrlService, LinkService],
})
export class UrlModule {}
