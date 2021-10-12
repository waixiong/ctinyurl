import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { IClick } from './link.interface';
import { Link, LinkDocument, Click } from './link.scheme';
import { generateNewLinkObject } from './link.utils';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel('Link') private readonly LinkModel: Model<LinkDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getShortLink(id: string): Promise<Link> {
    const link = await this.LinkModel.findOne({ _id: id }).exec();
    if (link == null) {
      throw new NotFoundException();
    }
    return link;
  }

  async createShortLink(url: string): Promise<Link> {
    const link = generateNewLinkObject(url);
    // TODO: avoid same _id
    const createdLink = new this.LinkModel(link);
    return createdLink.save();
  }

  async updateShortLink(linkObject: Link): Promise<void> {
    const link = await this.LinkModel.findOne({ _id: linkObject._id }).exec();
    if (link == null) {
      throw new NotFoundException();
    }
    link.url = linkObject.url;
    link.clicks = linkObject.clicks;
    await link.save();
  }

  async clickedShortLink(id: string, click: Click): Promise<Link> {
    const link = await this.LinkModel.findOne({ _id: id }).exec();
    if (link == null) {
      throw new NotFoundException();
    }
    link.clicks.push(click);
    return link.save();
  }
}
