import {
  Controller,
  Get,
  Headers,
  Param,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ipToGeo } from '../link/link.utils';

@ApiTags('Root')
@Controller()
export class UrlController {
  constructor(private readonly appService: UrlService) {}

  defaultTarget = '/';

  @Get('ping')
  @ApiOperation({
    description: 'ping',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'redirectTo',
    description: 'redirect to target url, if exist',
  })
  @ApiResponse({
    status: HttpStatus.MOVED_PERMANENTLY,
    description: 'Redirect to target, if exist',
  })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirect to default',
  })
  async redirectTo(
    @Headers() headers,
    @Param('id') code: string,
    @Res() res: Response,
  ) {
    console.log(headers);
    // get location from 'x-real-ip'
    const geo = ipToGeo(headers['x-real-ip']);
    try {
      const target = await this.appService.getUrl(code, geo);
      res.redirect(target, 301);
    } catch (e) {
      if (e instanceof NotFoundException) {
        res.redirect(this.defaultTarget, 302);
      }
    }
  }
}
