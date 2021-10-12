import { Injectable } from '@nestjs/common';
import { Click, Geo } from '../link/link.scheme';
import { LinkService } from '../link/link.service';

@Injectable()
export class UrlService {
  constructor(private readonly linkService: LinkService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUrl(code: string, geo?: number[]): Promise<string> {
    let click: Click;
    if (geo == undefined || geo.length != 2) {
      click = new Click({
        timestamp: Date.now(),
      });
    } else {
      click = new Click({
        timestamp: Date.now(),
        loc: new Geo(geo[0], geo[1]),
      });
    }
    const linkObject = await this.linkService.clickedShortLink(code, click);
    return linkObject.url;
  }
}
