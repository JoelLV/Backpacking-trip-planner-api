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
import { TransportationsService } from './transportations.service';
import { CreateTransportationDto } from './dto/create-transportation.dto';
import { UpdateTransportationDto } from './dto/update-transportation.dto';
import { Transportation } from './model/transportation.model';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiParam, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NumIdRequestParam } from 'src/validators/num-id-request-param.validator';
@ApiTags('Transportations')
@ApiSecurity('authentication', ['authentication'])
@Controller('transportations')
export class TransportationsController {
    constructor(
        private readonly transportationsService: TransportationsService,
    ) {}

    /**
     * Creates a new transportation entity and stores it
     * in the database.
     *
     * @param createTransportationDto dto used to fetch data for entity.
     * @returns the entity created.
     */
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Post()
    async create(
        @Body() createTransportationDto: CreateTransportationDto,
    ): Promise<Transportation> {
        const entity = await this.transportationsService.create(
            createTransportationDto,
        );
        return {
            id: entity.id,
            cost: entity.cost,
            name: entity.name,
            address: entity.address,
            description: entity.description,
        };
    }

    /**
     * Finds all transportation entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of transportation entities.
     */
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Get()
    findAll(): Promise<Transportation[]> {
        return this.transportationsService.findAll();
    }

    /**
     * Finds a single user entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of entity to find.
     * @returns the entity found.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Get(':id')
    findOne(@Param() { id }: NumIdRequestParam): Promise<Transportation> {
        return this.transportationsService.findOne(+id);
    }

    /**
     * Fully updates a single transportation entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createUserDto dto of entity to modify.
     * @returns the modified entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Put(':id')
    fullUpdate(
        @Param() { id }: NumIdRequestParam,
        @Body() createTransporationDto: CreateTransportationDto,
    ): Promise<Transportation> {
        return this.transportationsService.update(+id, createTransporationDto);
    }

    /**
     * Partially updates a single transportation entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateUserDto dto of entity to modify.
     * @returns the modified entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Patch(':id')
    update(
        @Param() { id }: NumIdRequestParam,
        @Body() updateTransportationDto: UpdateTransportationDto,
    ): Promise<Transportation> {
        if (
            updateTransportationDto.address === undefined &&
            updateTransportationDto.cost === undefined &&
            updateTransportationDto.description === undefined &&
            updateTransportationDto.name === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.transportationsService.update(+id, updateTransportationDto);
    }

    /**
     * Deletes the transportation entity using
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
    remove(@Param() { id }: NumIdRequestParam): Promise<Transportation> {
        return this.transportationsService.remove(+id);
    }
}
