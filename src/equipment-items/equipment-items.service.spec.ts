import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentItemsService } from './equipment-items.service';

describe('EquipmentItemsService', () => {
    let service: EquipmentItemsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EquipmentItemsService],
        }).compile();

        service = module.get<EquipmentItemsService>(EquipmentItemsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
