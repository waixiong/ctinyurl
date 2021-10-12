import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { LinkService } from './link.service';
import { ApiTags } from '@nestjs/swagger';
import {
  GetShortLinkReponseDto,
  GetShortLinkDetailsReponseDto,
  CreateShortLinkReponseDto,
  CreateLinkRequestDto,
} from './link.dto';

@ApiTags('link')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getHello(): string {
    return this.linkService.getHello();
  }

  @Get(':id')
  async getShortLink(
    @Param('id') code: string,
  ): Promise<GetShortLinkReponseDto> {
    const link = await this.linkService.getShortLink(code);
    return new GetShortLinkReponseDto({
      id: link._id,
      url: link.url,
      clicksCount: link.clicks.length,
    });
  }

  @Get(':id/details')
  async getShortLinkDetails(
    @Param('id') code: string,
  ): Promise<GetShortLinkDetailsReponseDto> {
    const link = await this.linkService.getShortLink(code);
    return new GetShortLinkDetailsReponseDto({
      id: link._id,
      url: link.url,
      clicksCount: link.clicks.length,
      clicks: link.clicks,
    });
  }

  @Post()
  async createShortLink(
    @Body() body: CreateLinkRequestDto,
  ): Promise<CreateShortLinkReponseDto> {
    const link = await this.linkService.createShortLink(body.url);
    return new CreateShortLinkReponseDto({
      id: link._id,
      url: link.url,
    });
  }
}
