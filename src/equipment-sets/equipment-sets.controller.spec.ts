import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentSetsController } from './equipment-sets.controller';
import { EquipmentSetsService } from './equipment-sets.service';

describe('EquipmentSetsController', () => {
  let controller: EquipmentSetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentSetsController],
      providers: [EquipmentSetsService],
    }).compile();

    controller = module.get<EquipmentSetsController>(EquipmentSetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
