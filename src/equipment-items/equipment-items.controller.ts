import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    BadRequestException,
} from '@nestjs/common';
import { EquipmentItemsService } from './equipment-items.service';
import { CreateEquipmentItemDto } from './dto/create-equipment-item.dto';
import { UpdateEquipmentItemDto } from './dto/update-equipment-item.dto';
import { EquipmentItem } from './model/equipment-item.model';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NumIdRequestParam } from 'src/validators/num-id-request-param.validator';

@ApiTags('Equipment Items')
@ApiSecurity('authentication', ['authentication'])
@Controller('equipment-items')
export class EquipmentItemsController {
    constructor(
        private readonly equipmentItemsService: EquipmentItemsService,
    ) {}

    /**
     * Creates a new equipment item entity and stores it
     * in the database.
     *
     * @param createEquipmentItemDto dto used to fetch data for entity.
     * @returns a equipment entity entity object.
     */
    @ApiNotFoundResponse({ description: 'Triggered when foreign keys of other entities do not exist.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Post()
    async create(
        @Body() createEquipmentItemDto: CreateEquipmentItemDto,
    ): Promise<EquipmentItem> {
        const entity = await this.equipmentItemsService.create(
            createEquipmentItemDto,
        );
        return {
            id: entity.id,
            gear_item_id: entity.gear_item.id,
            equipment_set_id: entity.equipment_set.id,
            quantity: entity.quantity,
        };
    }

    /**
     * Finds all equipment item entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of equipment item entities.
     */
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Get()
    async findAll(): Promise<EquipmentItem[]> {
        const entities = await this.equipmentItemsService.findAll();
        return entities.map((entity) => {
            return {
                id: entity.id,
                gear_item_id: entity.gear_item.id,
                equipment_set_id: entity.equipment_set.id,
                quantity: entity.quantity,
            };
        });
    }

    /**
     * Finds a single equipment item entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of equipment item to find.
     * @returns the entity found.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Get(':id')
    async findOne(@Param() { id }: NumIdRequestParam): Promise<EquipmentItem> {
        const entity = await this.equipmentItemsService.findOne(+id);
        return {
            id: entity.id,
            gear_item_id: entity.gear_item.id,
            equipment_set_id: entity.equipment_set.id,
            quantity: entity.quantity,
        };
    }

    /**
     * Fully updates a single equipment item entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createEquipmentItemDto dto of entity to modify.
     * @returns the modified entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found. Also applies to foreign keys of other entities.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Put(':id')
    async fullUpdate(
        @Param() { id }: NumIdRequestParam,
        @Body() createEquipmentItemDto: CreateEquipmentItemDto,
    ): Promise<EquipmentItem> {
        const entity = await this.equipmentItemsService.update(
            +id,
            createEquipmentItemDto,
        );
        return {
            id: entity.id,
            gear_item_id: entity.gear_item.id,
            equipment_set_id: entity.equipment_set.id,
            quantity: entity.quantity,
        };
    }

    /**
     * Partially updates a single equipment item entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateEquipmentItemDto dto of entity to modify.
     * @returns the modified entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found. Also applies to foreign keys of other entities.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Patch(':id')
    async update(
        @Param() { id }: NumIdRequestParam,
        @Body() updateEquipmentItemDto: UpdateEquipmentItemDto,
    ): Promise<EquipmentItem> {
        if (
            updateEquipmentItemDto.equipment_set_id === undefined &&
            updateEquipmentItemDto.gear_item_id === undefined &&
            updateEquipmentItemDto.quantity === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }

        const entity = await this.equipmentItemsService.update(
            +id,
            updateEquipmentItemDto,
        );
        return {
            id: entity.id,
            equipment_set_id: entity.equipment_set.id,
            gear_item_id: entity.gear_item.id,
            quantity: entity.quantity,
        };
    }

    /**
     * Deletes the equipment item entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found. Also applies to foreign keys of other entities.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Delete(':id')
    async remove(@Param() { id }: NumIdRequestParam): Promise<EquipmentItem> {
        const entity = await this.equipmentItemsService.remove(+id);
        return {
            id: entity.id,
            gear_item_id: entity.gear_item.id,
            equipment_set_id: entity.equipment_set.id,
            quantity: entity.quantity,
        };
    }
}
