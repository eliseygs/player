import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CreateCommentDto } from "../comment/dto/create-comment.dto";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { AlbumService} from "./album.service";
import { CreateTrackDto } from "./dto/create-track.dto";


@Controller('/albums')

export class AlbumController{
    constructor(private albumService: AlbumService){}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'picture', maxCount: 1},
    ]))

    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto){
        const {picture}= files
        return this.albumService.create(dto, picture[0])
    }

    @Get()
    getAll(@Query('count') count: number,
           @Query('offset') offset:number){
        return this.albumService.getAll(count, offset)
    }

    @Get('/search')
    search(@Query('query') query:string){
        return this.albumService.search(query) 
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.albumService.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.albumService.delete(id)
    }

    @Post('/comment')
    addComment(@Body() dto:CreateCommentDto){
        return this.albumService.addComment(dto)
    }
    
    @Post('/track')
    addTrack(@Body() dto:CreateTrackDto){
        return this.albumService.addTrack(dto)
    }
    
    @Post('/listen/:id')
    listen(@Param('id') id:number){
        return this.albumService.listen(id);
    }

}