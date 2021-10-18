import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Link, LinkDocument } from './link.scheme';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';

describe('AppController', () => {
  let appController: LinkController;
  let mockModel: Model<LinkDocument>;
  let service: LinkService;

  beforeEach(async () => {
    const link = new Link({
      _id: 'asdfghkj',
      url: 'https://www.coingecko.com/en/coins/bitcoin',
      clicks: [],
    });

    class mockLinkModel {
      constructor(public data?: any) {}
      save() {
        return this.data;
      }

      static findOne({ _id }) {
        return {
          exec: _id == link._id ? () => link : () => null,
        };
      }
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        LinkService,
        {
          provide: getModelToken('Link'),
          useValue: mockLinkModel,
        },
      ],
    }).compile();

    mockModel = app.get<Model<LinkDocument>>(getModelToken('Link'));

    appController = app.get<LinkController>(LinkController);
    service = app.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
    expect(service).toBeDefined();
    expect(mockModel).toBeDefined();
  });

  describe('get link', () => {
    it('should return link object', async () => {
      const link = new Link({
        _id: 'asdfghkj',
        url: 'https://www.coingecko.com/en/coins/bitcoin',
      });
      // const spy = jest.spyOn(mockModel, 'findOne').mockResolvedValue(() => ({
      //     lean: jest.fn().mockReturnValue(link),
      //     exec: jest.fn().mockReturnValue(link),
      //   }));
      const result = await appController.getShortLink(link._id);
      expect(result.url).toBe(link.url);
      // expect(spy).toBeCalled();
    });
  });

  describe('get link not found', () => {
    it('throw exception', async () => {
      await expect(await mockModel.findOne({ _id: 'qwertyui' }).exec()).toBe(
        null,
      );
    });
  });
});
