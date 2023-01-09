import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FileService, FileType } from "src/file/file.service";
import { CreateCommentDto } from "../comment/dto/create-comment.dto";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Comment } from "../comment/schemas/comment.schema";
import { Album } from "./schemas/album.schema";
import { Track } from "../track/schemas/track.schema";
import { CreateTrackDto } from "./dto/create-track.dto";

@Injectable()

export class AlbumService{
    constructor(@InjectModel(Album) private albumModel: typeof Album,
                @InjectModel(Comment) private commentModel: typeof Comment,
                @InjectModel(Track) private trackModel: typeof Track,
                private fileService: FileService){}

                
    async create(dto:CreateAlbumDto,picture){
        const picturePath= this.fileService.createFile(FileType.IMAGE_ALBUM, picture)
        const album= await this.albumModel.create({...dto, listens: 0, picture: picturePath})
        return album
    }
    async getAll(limit=10, offset=0){
        const albums= await this.albumModel.findAll({include:{all:true}, limit , offset})
        return albums
    }
    async getOne(id:number){
        const album= await this.albumModel.findOne({where:{id}, include:{all:true}})
        return album
    }
    async delete(id:number){
        await this.albumModel.destroy({where:{id}})
        return id
    }

    async addComment(dto:CreateCommentDto){
        const album=await this.albumModel.findByPk(dto.parentId)
        const comment= await this.commentModel.create({...dto})
        album.comments=[comment]
        await album.save()
        return comment;
    }

    async addTrack(dto:CreateTrackDto){
        const album=await this.albumModel.findByPk(dto.albumId)
        const track= await this.trackModel.create({...dto})
        album.tracks=[track]
        await album.save()
        return track;
    }

    async listen(id:number){
        const album= await this.albumModel.findByPk(id)    
        album.listens += 1
        album.save()
    }
    async search(query:string){
        const albums= await this.albumModel.findAll({where:{name:{regex:new RegExp(query, 'i')}}})
        return albums;
    }

}
