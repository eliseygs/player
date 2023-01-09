import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { FileService } from "src/file/file.service";
import { Comment } from "../comment/schemas/comment.schema";
import { Track } from "./schemas/track.schema";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.service";


@Module({
    controllers: [TrackController],
    providers:[TrackService, FileService],
    imports: [
        SequelizeModule.forFeature([Comment, Track]),
    ],

})

export class TrackModule{}