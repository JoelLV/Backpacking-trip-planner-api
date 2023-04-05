import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentPackageController } from './equipment-package.controller';
import { EquipmentPackageService } from './equipment-package.service';

describe('EquipmentPackageController', () => {
  let controller: EquipmentPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentPackageController],
      providers: [EquipmentPackageService],
    }).compile();

    controller = module.get<EquipmentPackageController>(EquipmentPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
