import { HasMany, Column, DataType, Model,  Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Album } from "src/album/schemas/album.schema";
import { Comment } from "../../comment/schemas/comment.schema";


// interface TrackCreationAttrs {
//     email:string;
//     password:string;
// }
@Table({tableName:'tracks'})
export class Track extends Model<Track>{

    @Column({type:DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    name:string;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    artist:string;

    @Column({type:DataType.STRING, unique:true})
    text:string;

    @Column({type:DataType.INTEGER, allowNull: false}) 
    listens:number;

    // @Column({type:DataType.BOOLEAN, allowNull: true})
    // banReason:boolean;

    @Column({type:DataType.STRING, unique:true})
    picture: string;

    @Column({type:DataType.STRING, unique:true})
    audio: string;

    @HasMany(() => Comment)
    comments: Comment[];

    @BelongsTo (() => Album)
      album: Album;

    @ForeignKey(() => Album)
    //@Column({type: DataType.STRING, allowNull: false})
    //ненужна
    albumId: number;

}