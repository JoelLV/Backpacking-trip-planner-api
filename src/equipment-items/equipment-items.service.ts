import { Injectable } from '@nestjs/common';
import { CreateEquipmentItemsDto } from './dto/create-equipment-items.dto';
import { UpdateEquipmentItemsDto } from './dto/update-equipment-items.dto';

@Injectable()
export class EquipmentItemsService {
  create(createEquipmentItemDto: CreateEquipmentItemsDto) {
    return 'This action adds a new equipmentItem';
  }

  findAll() {
    return `This action returns all equipmentItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentItem`;
  }

  update(id: number, updateEquipmentItemDto: UpdateEquipmentItemsDto) {
    return `This action updates a #${id} equipmentItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentItem`;
  }
}
