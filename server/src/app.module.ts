import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
import { Track } from "./track/schemas/track.schema";
import { Comment } from "./comment/schemas/comment.schema";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AlbumModule } from "./album/album.module";
import { Album } from "./album/schemas/album.schema";

@Module({
    imports:[
    ConfigModule.forRoot({
    envFilePath: `.${process.env.NODE_ENV}.env`
    //envFilePath: '.env'
    }),
    ServeStaticModule.forRoot({rootPath: join(__dirname, 'static')}),
    SequelizeModule.forRoot({
       dialect: 'postgres',
       host: process.env.POSTGRES_HOST,
       port: Number(process.env.POSTGRESS_PORT),
       username: process.env.POSTGRES_USER,
       password: `${process.env.POSTGRESS_PASSWORD}`,
       database:process.env.POSTGRES_DB,
       models: [Comment, Track, Album],
       autoLoadModels:true,
    }),
        TrackModule,
        FileModule,
        AlbumModule
    ]
})

export class AppModule{}