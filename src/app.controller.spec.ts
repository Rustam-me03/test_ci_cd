import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    process.env.PORT = '3000'; // Устанавливаем переменную среды

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true })],
      controllers: [AppController],
      providers: [ConfigService],
    }).compile();

    appController = module.get<AppController>(AppController);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('root', () => {
    it('should return "Hello World!" with the port', () => {
      jest.spyOn(configService, 'get').mockReturnValue('3000');

      expect(appController.getHello()).toBe('Hello World! PORT = 3000');
    });
  });
});
