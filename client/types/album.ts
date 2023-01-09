import { ITrack } from "./track";

export interface IAlbum {
    id:string;
    tracks: ITrack[];
    error: string;
}

export interface AlbumState {
    albums: IAlbum[];
    error: string;
}

export enum AlbumActionTypes {
    FETCH_ALBUM= 'FETCH_ALBUM',
    FETCH_ALBUM_ERROR = 'FETCH_TRACKS_ALBUM',
}

interface FetchAlbumsAction {
    type: AlbumActionTypes.FETCH_ALBUM;
    payload: IAlbum[]
}

interface FetchAlbumsErrorAction {
    type: AlbumActionTypes.FETCH_ALBUM_ERROR;
    payload: string
}

export type AlbumAction = FetchAlbumsAction | FetchAlbumsErrorAction