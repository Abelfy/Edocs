import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SoftwaresModule } from './softwares/softwares.module';
import { RouterModule } from '@nestjs/core';
import { VersionsModule } from './softwares/versions/versions.module';
import { AuthModule } from './auth/auth.module';
import { FunctionnalitiesModule } from './softwares/versions/functionnalities/functionnalities.module';
import { ItemsModule } from './softwares/versions/items/items.module';
import { UnitsModule } from './softwares/versions/items/units/units.module';
import { JiraModule } from './jira/jira.module';
import { ReportModule } from './report/report.module';
import { RisksModule } from './softwares/versions/risks/risks.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true , validationSchema : Joi.object({ 
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRATION: Joi.string().required(),
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      JIRA_HOST: Joi.string().required(),
      JIRA_ACCOUNT_EMAIL: Joi.string().required(),
      JIRA_API_TOKEN: Joi.string().required(),
    })}),
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
          path: '/:softwareId/versions',
          module: VersionsModule,
          children: [{
            path: '/:versionId/functionnalities',
            module: FunctionnalitiesModule
          }, {
            path: '/:versionId/risks',
            module: RisksModule,
          }, {
            path: '/:versionId/items',
            module: ItemsModule,
            children: [{
              path: '/:itemId/units',
              module: UnitsModule,
            }]
          }],
        }]
      }]),
    UsersModule,
    SoftwaresModule,
    AuthModule,
    JiraModule,
    ReportModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
