import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SoftwaresModule } from './softwares/softwares.module';
import { RouterModule } from '@nestjs/core';
import { VersionsModule } from './softwares/versions/versions.module';
import { AuthModule } from './auth/auth.module';
import { FunctionnalitiesModule } from './softwares/versions/functionnalities/functionnalities.module';
import { RisksModule } from './softwares/versions/functionnalities/risks/risks.module';
import { ItemsModule } from './softwares/versions/items/items.module';
import { UnitsModule } from './softwares/versions/items/units/units.module';
import { JiraModule } from './jira/jira.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: parseInt(configService.getOrThrow('POSTGRES_PORT')),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DB'),
        autoLoadEntities: true,
        applicationName: 'Edocs',
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: '/softwares',
        module: SoftwaresModule,
        children: [{
          path: '/:id/versions',
          module: VersionsModule,
          children: [{
            path: '/:id/functionnalities',
            module: FunctionnalitiesModule,
            children: [{
              path: '/:id/risks',
              module: RisksModule,
            }]
          }, {
            path: '/:id/items',
            module: ItemsModule,
            children: [{
              path: '/:id/units',
              module: UnitsModule,
            }]
          }],
        }]
      }]),
    UsersModule,
    SoftwaresModule,
    AuthModule,
    JiraModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
