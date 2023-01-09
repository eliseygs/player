import React from 'react';
import {ITrack} from "../types/track";
import {Box, Grid} from "@mui/material";
import {Book} from "@mui/icons-material";
import TrackItem from "./TrackItem";
import AlbumItem from './AlbumItem';
import { IAlbum } from '../types/album';

interface AlbumListProps {
    albums: IAlbum[]
}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {

    return (
        <Grid container direction="column">
            <Box p={2}>
                {albums.map(album =>
                    <AlbumItem
                        key={album.id}
                        album={album}
                    />
                )}
            </Box>
        </Grid>
    );
};

export default AlbumList;