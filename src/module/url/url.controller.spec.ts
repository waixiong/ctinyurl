import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

describe('AppController', () => {
  let appController: UrlController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService],
    }).compile();

    appController = app.get<UrlController>(UrlController);
  });

  describe('ping', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});

// {
//   range: [ 3401082368, 3401082623 ],
//   country: 'MY',
//   region: '10',
//   eu: '0',
//   timezone: 'Asia/Kuala_Lumpur',
//   city: 'Petaling Jaya',
//   ll: [ 3.1065, 101.6079 ],
//   metro: 0,
//   area: 10
// }
