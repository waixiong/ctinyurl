import { Controller, Get, Param, Post, Body, HttpStatus } from '@nestjs/common';
import { LinkService } from './link.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Get(':id')
  @ApiOperation({
    operationId: 'getShortLink',
    description: 'return basic url object, if exist',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'basic url object',
    type: GetShortLinkReponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
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
  @ApiOperation({
    operationId: 'getShortLinkDetails',
    description:
      'return details url object, with details of every click, if exist',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'details url object',
    type: GetShortLinkDetailsReponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
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
  @ApiOperation({
    operationId: 'createShortLink',
    description: 'create url short link',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success create object',
    type: CreateLinkRequestDto,
  })
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
