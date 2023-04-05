import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentPackageService } from './equipment-package.service';

describe('EquipmentPackageService', () => {
  let service: EquipmentPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipmentPackageService],
    }).compile();

    service = module.get<EquipmentPackageService>(EquipmentPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
