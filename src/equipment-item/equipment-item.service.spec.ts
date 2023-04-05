import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentItemService } from './equipment-item.service';

describe('EquipmentItemService', () => {
    let service: EquipmentItemService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EquipmentItemService],
        }).compile();

        service = module.get<EquipmentItemService>(EquipmentItemService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
