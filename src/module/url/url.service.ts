import { Injectable } from '@nestjs/common';
import { LinkService } from '../link/link.service';

@Injectable()
export class UrlService {
  constructor(private readonly linkService: LinkService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUrl(code: string): Promise<string> {
    // const linkObject = await this.linkService.getShortLink(code);
    const linkObject = await this.linkService.clickedShortLink(code, {
      timestamp: Date.now(),
    });
    return linkObject.url;
  }
}
