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

@Controller('trails')
export class TrailsController {
    constructor(private readonly trailsService: TrailsService) {}

    /**
     * Creates a new trail entity and stores it
     * in the database.
     *
     * @param createTrailDto dto used to fetch data for entity.
     * @returns a user entity object.
     */
    @Post()
    create(@Body() createTrailDto: CreateTrailDto) {
        return this.trailsService.create(createTrailDto);
    }

    /**
     * Finds all trail entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of trail entities.
     */
    @Get()
    findAll() {
        return this.trailsService.findAll();
    }

    /**
     * Finds a single trail entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of trail to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
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
    @Put(':id')
    fullUpdate(
        @Param('id') id: string,
        @Body() createTrailDto: CreateTrailDto,
    ) {
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
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTrailDto: UpdateTrailDto) {
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
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.trailsService.remove(+id);
    }
}
