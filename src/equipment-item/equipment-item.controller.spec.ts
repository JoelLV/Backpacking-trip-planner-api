import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentItemController } from './equipment-item.controller';
import { EquipmentItemService } from './equipment-item.service';

describe('EquipmentItemController', () => {
    let controller: EquipmentItemController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EquipmentItemController],
            providers: [EquipmentItemService],
        }).compile();

        controller = module.get<EquipmentItemController>(
            EquipmentItemController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
