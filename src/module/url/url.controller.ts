import { Controller, Get, Headers, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';

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
    const target = await this.appService.getUrl(code);
    res.redirect(target, 301);
  }
}
