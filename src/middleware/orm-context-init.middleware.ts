import { EntityManager } from '@mikro-orm/mysql';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {  RequestContext } from "@mikro-orm/core"

@Injectable()
export class OrmContextInitMiddleware implements NestMiddleware {
    constructor(private em: EntityManager) {}

    /**
     * Initializes Mikro-orm context before
     * any custom middleware. Necessary in order
     * to use Mikro-orm in custom queries.
     * @see https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci
     * @param request not used.
     * @param response not used.
     * @param next next function in the middleware chain.
     */
    use(request: Request, response: Response, next: NextFunction) {
        RequestContext.create(this.em, next)
    }
}