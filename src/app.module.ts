import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { LodgingsModule } from './lodgings/lodgings.module';
import { TrailsModule } from './trails/trails.module';
import { TransportationsModule } from './transportations/transportations.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EquipmentSetsModule } from './equipment-sets/equipment-sets.module';
import { GearItemsModule } from './gear-items/gear-items.module';
import { EquipmentItemsModule } from './equipment-items/equipment-items.module';
import { AuthMiddleware } from './middleware/authentication.middleware';
import { OrmContextInitMiddleware } from './middleware/orm-context-init.middleware';

@Module({
    imports: [
        MikroOrmModule.forRoot(),
        UsersModule,
        TripsModule,
        LodgingsModule,
        TrailsModule,
        TransportationsModule,
        EquipmentSetsModule,
        GearItemsModule,
        EquipmentItemsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(OrmContextInitMiddleware, AuthMiddleware)
            .exclude({ path: '/users/admin', method: RequestMethod.POST })
            .forRoutes({ path: '/*', method: RequestMethod.ALL })
    }
}
