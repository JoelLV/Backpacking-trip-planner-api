import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentItemsController } from './equipment-items.controller';
import { EquipmentItemsService } from './equipment-items.service';

describe('EquipmentItemsController', () => {
  let controller: EquipmentItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentItemsController],
      providers: [EquipmentItemsService],
    }).compile();

    controller = module.get<EquipmentItemsController>(EquipmentItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
