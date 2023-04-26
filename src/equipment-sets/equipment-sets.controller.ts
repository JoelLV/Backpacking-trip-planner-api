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
import { EquipmentSetsService } from './equipment-sets.service';
import { CreateEquipmentSetDto } from './dto/create-equipment-set.dto';
import { UpdateEquipmentSetDto } from './dto/update-equipment-set.dto';
import { EquipmentSet } from './model/equipment-set.model';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiParam, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NumIdRequestParam } from 'src/validators/num-id-request-param.validator';

@ApiTags('Equipment Sets')
@ApiSecurity('authentication', ['authentication'])
@Controller('equipment-sets')
export class EquipmentSetsController {
    constructor(private readonly equipmentSetsService: EquipmentSetsService) {}

    /**
     * Creates a new equipment set entity and stores it
     * in the database.
     *
     * @param createEquipmentSetDto dto used to fetch data for entity.
     * @returns a equipment set entity object.
     */
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Post()
    async create(
        @Body() createEquipmentSetDto: CreateEquipmentSetDto,
    ): Promise<EquipmentSet> {
        const entity = await this.equipmentSetsService.create(
            createEquipmentSetDto,
        );
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
        };
    }

    /**
     * Finds all equipment set entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of equipment set entities.
     */
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Get()
    async findAll(): Promise<EquipmentSet[]> {
        return this.equipmentSetsService.findAll();
    }

    /**
     * Finds a single equipment set entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of equipment set to find.
     * @returns the entity found.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Get(':id')
    findOne(@Param() { id }: NumIdRequestParam): Promise<EquipmentSet> {
        return this.equipmentSetsService.findOne(+id);
    }

    /**
     * Fully updates a single equipment set entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createEquipmentSetDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    fullUpdate(
        @Param() { id }: NumIdRequestParam,
        @Body() createEquipmentSetDto: CreateEquipmentSetDto,
    ): Promise<EquipmentSet> {
        return this.equipmentSetsService.update(+id, createEquipmentSetDto);
    }

    /**
     * Partially updates a single equipment set entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateEquipmentSetDto dto of entity to modify.
     * @returns the modified entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Patch(':id')
    update(
        @Param() { id }: NumIdRequestParam,
        @Body() updateEquipmentSetDto: UpdateEquipmentSetDto,
    ): Promise<EquipmentSet> {
        if (
            updateEquipmentSetDto.description === undefined &&
            updateEquipmentSetDto.name === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.equipmentSetsService.update(+id, updateEquipmentSetDto);
    }

    /**
     * Deletes the equipment set entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Delete(':id')
    remove(@Param() { id }: NumIdRequestParam): Promise<EquipmentSet> {
        return this.equipmentSetsService.remove(+id);
    }
}
