import { BelongsTo, ForeignKey, Column, DataType, Model,  Table } from "sequelize-typescript";
import { Album } from "src/album/schemas/album.schema";
import { Track } from "../../track/schemas/track.schema";


// interface CommentCreationAttrs {
//     email:string;
//     password:string;
// }
@Table({tableName:'comments'})
export class Comment extends Model<Comment>{

    @Column({type:DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    username:string;

    @Column({type:DataType.STRING, unique:true, allowNull:false})
    text:string;

    // @h(() => Role, () => UserRoles)
    // roles: Role[];
    // @BelongsTo(() => Track) 
    // roles: Role[];
    @BelongsTo (() => Track)
      track: Track;

    @ForeignKey(() => Track)
    //@Column({type: DataType.STRING, allowNull: false})
    //ненужна
    trackId: number;

    @BelongsTo (() => Album)
      album: Album;

    @ForeignKey(() => Album)
    //@Column({type: DataType.STRING, allowNull: false})
    //ненужна
    albumId: number;
}