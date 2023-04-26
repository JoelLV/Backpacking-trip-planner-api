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
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './model/trail.model';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiParam, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { NumIdRequestParam } from 'src/validators/num-id-request-param.validator';

@ApiTags('Trails')
@ApiSecurity('authentication', ['authentication'])
@Controller('trails')
export class TrailsController {
    constructor(private readonly trailsService: TrailsService) {}

    /**
     * Creates a new trail entity and stores it
     * in the database.
     *
     * @param createTrailDto dto used to fetch data for entity.
     * @returns a trail entity object.
     */
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Post()
    async create(@Body() createTrailDto: CreateTrailDto): Promise<Trail> {
        const entity = await this.trailsService.create(createTrailDto);
        return {
            id: entity.id,
            name: entity.name,
            difficulty: entity.difficulty,
            location: entity.location,
            length: entity.length,
            description: entity.description,
        };
    }

    /**
     * Finds all trail entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of trail entities.
     */
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @Get()
    findAll(): Promise<Trail[]> {
        return this.trailsService.findAll();
    }

    /**
     * Finds a single trail entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of trail to find.
     * @returns the entity found.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Get(':id')
    findOne(@Param() { id }: NumIdRequestParam): Promise<Trail> {
        return this.trailsService.findOne(+id);
    }

    /**
     * Fully updates a single trail entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createTrailDto dto of entity to modify.
     * @returns the modified entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Put(':id')
    fullUpdate(
        @Param() { id }: NumIdRequestParam,
        @Body() createTrailDto: CreateTrailDto,
    ): Promise<Trail> {
        return this.trailsService.update(+id, createTrailDto);
    }

    /**
     * Partially updates a single trail entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateTrailDto dto of entity to modify.
     * @returns the modified entity.
     */
    @ApiNotFoundResponse({ description: 'Triggered when entity specified is not found.' })
    @ApiBadRequestResponse({ description: 'Triggered when data validation of request parameters or body fail.' })
    @ApiUnauthorizedResponse({ description: 'Triggered when the "authentication" key is not provided on headers or the API key is not valid.' })
    @ApiParam({ name: 'id' })
    @Patch(':id')
    update(
        @Param() { id }: NumIdRequestParam,
        @Body() updateTrailDto: UpdateTrailDto,
    ): Promise<Trail> {
        if (
            updateTrailDto.name === undefined &&
            updateTrailDto.description === undefined &&
            updateTrailDto.difficulty == undefined &&
            updateTrailDto.length == undefined &&
            updateTrailDto.location === undefined
        ) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.trailsService.update(+id, updateTrailDto);
    }

    /**
     * Deletes the trail entity using
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
    remove(@Param() { id }: NumIdRequestParam): Promise<Trail> {
        return this.trailsService.remove(+id);
    }
}
