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
import { User } from './model/user.model';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { StringIdRequestParam } from 'src/validators/string-id-request-param.validator';

@ApiTags('Users')
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
    @ApiSecurity('authentication', ['authentication'])
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        const entity = await this.usersService.create(createUserDto);
        return {
            id: entity.id,
            apiKey: entity.apiKey,
            name: entity.name,
        };
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
    async createAdmin(@Body() createUserDto: CreateUserDto): Promise<User> {
        const entity = await this.usersService.create(createUserDto);
        return {
            id: entity.id,
            apiKey: entity.apiKey,
            name: entity.name,
        };
    }

    /**
     * Finds all user entities stored in the database
     * and returns them as JSON.
     *
     * @returns an array of user entities.
     */
    @ApiSecurity('authentication', ['authentication'])
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    /**
     * Finds a single user entity stored in the database
     * and returns it as JSON.
     *
     * @param id id of entity to find.
     * @returns the entity found.
     */
    @ApiSecurity('authentication', ['authentication'])
    @Get(':id')
    findOne(@Param() { id }: StringIdRequestParam): Promise<User> {
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
    @ApiSecurity('authentication', ['authentication'])
    @Put(':id')
    fullUpdate(
        @Param() { id }: StringIdRequestParam,
        @Body() createUserDto: CreateUserDto,
    ): Promise<User> {
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
    @ApiSecurity('authentication', ['authentication'])
    @Patch(':id')
    update(
        @Param() { id }: StringIdRequestParam,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
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
    @ApiSecurity('authentication', ['authentication'])
    @Delete(':id')
    remove(@Param() { id }: StringIdRequestParam): Promise<User> {
        return this.usersService.remove(id);
    }
}
