import { Injectable } from '@nestjs/common';
import { CreateEquipmentPackageDto } from './dto/create-equipment-package.dto';
import { UpdateEquipmentPackageDto } from './dto/update-equipment-package.dto';

@Injectable()
export class EquipmentPackageService {
  create(createEquipmentPackageDto: CreateEquipmentPackageDto) {
    return 'This action adds a new equipmentPackage';
  }

  findAll() {
    return `This action returns all equipmentPackage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipmentPackage`;
  }

  update(id: number, updateEquipmentPackageDto: UpdateEquipmentPackageDto) {
    return `This action updates a #${id} equipmentPackage`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipmentPackage`;
  }
}
