import { ApiProperty } from '@nestjs/swagger';
import { IClick } from './link.interface';

export class GetShortLinkReponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  clicksCount: number;

  constructor(data: GetShortLinkReponseDto) {
    Object.assign(this, data);
  }
}

export class CreateShortLinkReponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  constructor(data: CreateShortLinkReponseDto) {
    Object.assign(this, data);
  }
}

export class CreateLinkRequestDto {
  @ApiProperty()
  url: string;
}

export class GetShortLinkDetailsReponseDto extends GetShortLinkReponseDto {
  // list of clicks
  @ApiProperty()
  clicks: IClick[];

  constructor(data: GetShortLinkDetailsReponseDto) {
    super(data);
    Object.assign(this, data);
  }
}
