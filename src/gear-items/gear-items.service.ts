import { Injectable } from '@nestjs/common';
import { CreateGearItemDto } from './dto/create-gear-item.dto';
import { UpdateGearItemDto } from './dto/update-gear-item.dto';

@Injectable()
export class GearItemsService {
    create(createGearItemDto: CreateGearItemDto) {
        return 'This action adds a new gearItem';
    }

    findAll() {
        return `This action returns all gearItems`;
    }

    findOne(id: number) {
        return `This action returns a #${id} gearItem`;
    }

    update(id: number, updateGearItemDto: UpdateGearItemDto) {
        return `This action updates a #${id} gearItem`;
    }

    remove(id: number) {
        return `This action removes a #${id} gearItem`;
    }
}
