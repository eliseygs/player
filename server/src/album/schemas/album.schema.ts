import { HasMany, Column, DataType, Model,  Table } from "sequelize-typescript";
import { Comment } from "../../comment/schemas/comment.schema";
import { Track } from "../../track/schemas/track.schema";


// interface TrackCreationAttrs {
//     email:string;
//     password:string;
// }
@Table({tableName:'albums'})
export class Album extends Model<Album>{

    @Column({type:DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    name:string;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    author:string;

    @Column({type:DataType.STRING, unique:true})
    picture: string;

    @Column({type:DataType.INTEGER, allowNull: false}) 
    listens:number;

    @HasMany(() => Track)
    tracks: Track[];

    @HasMany(() => Comment)
    comments: Comment[];
}