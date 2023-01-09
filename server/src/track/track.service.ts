import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FileService, FileType } from "src/file/file.service";
import { CreateCommentDto } from "../comment/dto/create-comment.dto";
import { CreateTrackDto } from "./dto/create-track.dto";
import { Comment } from "../comment/schemas/comment.schema";
import { Track } from "./schemas/track.schema";

@Injectable()

export class TrackService{
    constructor(@InjectModel(Track) private trackModel: typeof Track,
                @InjectModel(Comment) private commentModel: typeof Comment,
                private fileService: FileService){}

                
    async create(dto:CreateTrackDto,picture, audio){
        const audioPath= this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath= this.fileService.createFile(FileType.IMAGE_TRACK, picture)
        const track= await this.trackModel.create({...dto, listens: 0, audio: audioPath, picture: picturePath})
        return track
    }
    async getAll(limit=10, offset=0){
        const tracks= await this.trackModel.findAll({include:{all:true}, limit , offset})
        return tracks
    }
    async getOne(id:number){
        const track= await this.trackModel.findOne({where:{id}, include:{all:true}})
        return track
    }
    async delete(id:number){
        await this.trackModel.destroy({where:{id}})
        return id
    }

    async addComment(dto:CreateCommentDto){
        const track=await this.trackModel.findByPk(dto.parentId)
        const comment= await this.commentModel.create({...dto})
        track.comments=[comment]
        await track.save()
        return comment;
    }
    async listen(id:number){
        const track= await this.trackModel.findByPk(id)    
        track.listens += 1
        track.save()
    }
    async search(query:string){
        const tracks= await this.trackModel.findAll({where:{name:{regex:new RegExp(query, 'i')}}})
        return tracks;
    }

}
