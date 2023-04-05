import { Injectable } from '@nestjs/common';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';

@Injectable()
export class EquipmentItemService {
  create(createEquipmentItemDto: CreateEquipmentItemDto) {
    return 'This action adds a new equipmentItem';
  }

  findAll() {
    return `This action returns all equipmentItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentItem`;
  }

  update(id: number, updateEquipmentItemDto: UpdateEquipmentItemDto) {
    return `This action updates a #${id} equipmentItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentItem`;
  }
}
