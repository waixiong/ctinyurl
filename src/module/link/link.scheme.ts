import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IClick, ILink } from './link.interface';
import * as mongoose from 'mongoose';

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

export class Geo {
  constructor(lat: number, lon: number) {
    this.coordinates = [lon, lat];
    this.type = 'Point';
  }

  @Prop()
  readonly type: string;
  @Prop()
  readonly coordinates: number[];
}

export class Click implements IClick {
  constructor(data: Partial<Click> = {}) {
    Object.assign(this, data);
  }

  @Prop({ required: true })
  readonly timestamp: number;

  // geolocation
  @Prop({ required: false, type: mongoose.Types.EmbeddedDocument })
  readonly loc?: Geo;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
