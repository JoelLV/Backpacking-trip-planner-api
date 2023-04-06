import { Test, TestingModule } from '@nestjs/testing';
import { GearItemsService } from './gear-items.service';

describe('GearItemsService', () => {
    let service: GearItemsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GearItemsService],
        }).compile();

        service = module.get<GearItemsService>(GearItemsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
