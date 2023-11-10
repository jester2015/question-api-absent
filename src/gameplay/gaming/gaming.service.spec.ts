import { Test, TestingModule } from '@nestjs/testing';
import { GamingService } from './gaming.service';

describe('GamingService', () => {
  let service: GamingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamingService],
    }).compile();

    service = module.get<GamingService>(GamingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
