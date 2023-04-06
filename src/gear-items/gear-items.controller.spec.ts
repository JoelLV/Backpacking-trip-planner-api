import { Test, TestingModule } from '@nestjs/testing';
import { GearItemsController } from './gear-items.controller';
import { GearItemsService } from './gear-items.service';

describe('GearItemsController', () => {
    let controller: GearItemsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GearItemsController],
            providers: [GearItemsService],
        }).compile();

        controller = module.get<GearItemsController>(GearItemsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
