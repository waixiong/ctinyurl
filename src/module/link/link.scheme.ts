import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IClick, ILink } from './link.interface';

export type LinkDocument = Link & Document;

@Schema()
export class Link implements ILink {
  constructor(data: Partial<Link> = {}) {
    Object.assign(this, data);
  }

  @Prop({ required: true })
  readonly _id: string; // 6 char

  @Prop({ required: true })
  url: string;

  @Prop()
  clicks: Click[];
}

export class Click implements IClick {
  constructor(data: Partial<Link> = {}) {
    Object.assign(this, data);
  }

  @Prop({ required: true })
  readonly timestamp: number;

  // geolocation
}

export const LinkSchema = SchemaFactory.createForClass(Link);
