import { Injectable } from '@nestjs/common';
import { CreateEquipmentSetDto } from './dto/create-equipment-set.dto';
import { UpdateEquipmentSetDto } from './dto/update-equipment-set.dto';

@Injectable()
export class EquipmentSetsService {
    create(createEquipmentSetDto: CreateEquipmentSetDto) {
        return 'This action adds a new equipmentSet';
    }

    findAll() {
        return `This action returns all equipmentSets`;
    }

    findOne(id: number) {
        return `This action returns a #${id} equipmentSet`;
    }

    update(id: number, updateEquipmentSetDto: UpdateEquipmentSetDto) {
        return `This action updates a #${id} equipmentSet`;
    }

    remove(id: number) {
        return `This action removes a #${id} equipmentSet`;
    }
}
