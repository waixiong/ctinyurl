import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { ApiTags } from '@nestjs/swagger';
import { ipToGeo } from '../link/link.utils';

@ApiTags('Root')
@Controller()
export class UrlController {
  constructor(private readonly appService: UrlService) {}

  @Get('ping')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  async redirectTo(
    @Headers() headers,
    @Param('id') code: string,
    @Res() res: Response,
  ) {
    console.log(headers);
    // get location from 'x-real-ip'
    const geo = ipToGeo(headers['x-real-ip']);
    const target = await this.appService.getUrl(code, geo);
    res.redirect(target, 301);
  }
}
