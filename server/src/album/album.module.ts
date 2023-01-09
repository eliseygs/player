import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comment } from "../comment/schemas/comment.schema";
import { FileService } from "src/file/file.service";
import { Track } from "src/track/schemas/track.schema";
import { AlbumController } from "./album.controller";
import { AlbumService } from "./album.service";
import { Album } from "./schemas/album.schema";


@Module({
    controllers: [AlbumController],
    providers:[AlbumService, FileService],
    imports: [
        SequelizeModule.forFeature([Comment, Album, Track]),
    ],

})

export class AlbumModule{}