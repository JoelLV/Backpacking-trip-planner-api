import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { User } from './entities/user.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class UsersService {
    constructor(private em: EntityManager) {}

    /**
     * Creates a new user entity and stores it
     * in the database.
     *
     * @param createUserDto dto used to fetch data needed for entity.
     * @returns the newly created entity.
     */
    async create(createUserDto: CreateUserDto): Promise<Loaded<User>> {
        const user: User = new User(createUserDto);
        await this.em.persistAndFlush(user);

        return user;
    }

    /**
     * Returns all user entities currently
     * stored in the database.
     *
     * @returns an array of entities.
     */
    findAll(): Promise<Loaded<User>[]> {
        return this.em.find(User, {});
    }

    /**
     * Finds a single user entity and
     * returns it if found. If not found,
     * a not found error is raised.
     *
     * @param id id of user entity to find.
     * @returns the entity found.
     */
    async findOne(id: string): Promise<Loaded<User>> {
        const user: Loaded<User> | null = await this.em.findOne(User, { id });

        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    /**
     * Updates a user entity if found using dto. Raises
     * not found error if not found.
     *
     * @param id id of user entity to find.
     * @param userDto dto used to update user entity.
     * @returns the updated user entity.
     */
    async update(
        id: string,
        userDto: UpdateUserDto | CreateUserDto,
    ): Promise<Loaded<User>> {
        const user: Loaded<User> = await this.findOne(id);
        user.name = userDto.name ?? user.name;

        await this.em.persistAndFlush(user);
        return user;
    }

    /**
     * Removes a user entity if found using id.
     * Raises not found error if not found.
     *
     * @param id id of user entity to find.
     * @returns the entity eliminated.
     */
    async remove(id: string): Promise<Loaded<User>> {
        const user: Loaded<User> = await this.findOne(id);
        this.em.removeAndFlush(user);

        return user;
    }
}
