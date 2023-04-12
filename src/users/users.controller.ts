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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface UserReturn {
    id: string,
    apiKey: string,
    name: string
}
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Creates a new user entity and stores it
     * in the database.
     *
     * @param createUserDto dto used to fetch data for entity.
     * @returns a user entity object.
     */
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserReturn> {
        const entity = await this.usersService.create(createUserDto);
        return {
            id: entity.id,
            apiKey: entity.apiKey,
            name: entity.name
        }
    }

    /**
     * Creates a new user without the need
     * of api key authentication. ONLY USED
     * FOR TESTING.
     * 
     * @param createUserDto dto used to create user.
     * @returns the user entity created.
     */
    @Post('/admin')
    async createAdmin(@Body() createUserDto: CreateUserDto): Promise<UserReturn> {
        const entity = await this.usersService.create(createUserDto);
        return {
            id: entity.id,
            apiKey: entity.apiKey,
            name: entity.name
        }
    }

    /**
     * Finds all user entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of user entities.
     */
    @Get()
    findAll(): Promise<UserReturn[]> {
        return this.usersService.findAll();
    }

    /**
     * Finds a single user entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of entity to find.
     * @returns the entity found.
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<UserReturn> {
        return this.usersService.findOne(id);
    }

    /**
     * Fully updates a single user entity using the id
     * provided and the dto.
     *
     * @param id id of entity to edit.
     * @param createUserDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Put(':id')
    fullUpdate(
        @Param('id') id: string,
        @Body() createUserDto: CreateUserDto,
    ): Promise<UserReturn> {
        return this.usersService.update(id, createUserDto);
    }

    /**
     * Partially updates a single user entity using
     * the id provided and the dto.
     *
     * @param id id of entity to edit.
     * @param updateUserDto dto of entity to modify.
     * @returns the modified entity.
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserReturn> {
        if (updateUserDto.name === undefined) {
            throw new BadRequestException(
                'Must provide at least one property.',
            );
        }
        return this.usersService.update(id, updateUserDto);
    }

    /**
     * Deletes the user entity using
     * the id provided.
     *
     * @param id id of entity to delete.
     * @returns the deleted entity.
     */
    @Delete(':id')
    remove(@Param('id') id: string): Promise<UserReturn> {
        return this.usersService.remove(id);
    }
}
