import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentSetsService } from './equipment-sets.service';

describe('EquipmentSetsService', () => {
    let service: EquipmentSetsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EquipmentSetsService],
        }).compile();

        service = module.get<EquipmentSetsService>(EquipmentSetsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
