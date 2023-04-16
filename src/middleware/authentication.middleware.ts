import { EntityManager } from '@mikro-orm/mysql';
import {
    NestMiddleware,
    UnauthorizedException,
    Injectable,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private em: EntityManager) {}

    /**
     * Middleware in charge of authenticating
     * user. Checks if the API key provided
     * by user exists in database, if no API key
     * is provided or the API key does not exists
     * in records, an 401 error will be raised.
     *
     * @param request User request.
     * @param response Not used.
     * @param next Next function in middleware chain.
     */
    async use(request: Request, response: Response, next: NextFunction) {
        const { authentication } = request.headers;

        if (authentication === undefined) {
            throw new UnauthorizedException(
                'Must provide an API key for authentication.',
            );
        }
        const user: Loaded<User> | null = await this.em.findOne(User, {
            apiKey: authentication,
        });
        if (!user) {
            throw new UnauthorizedException('Invalid API key provided.');
        }
        next();
    }
}
