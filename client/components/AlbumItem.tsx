import React from 'react';
import {Card, Grid, IconButton} from "@mui/material";
import styles from '../styles/TrackItem.module.scss'
import {Delete, Pause, PlayArrow} from "@mui/icons-material";
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import { IAlbum } from '../types/album';

interface AlbumItemProps {
    album: IAlbum;
    active?: boolean;
}

const AlbumItem: React.FC<AlbumItemProps> = ({album, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()

    // const play : any = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     e.stopPropagation()
    //     setActiveTrack(album)
    //     playTrack()
    // }

    return (
        <Card className={styles.track} onClick={() => router.push('/albums/' + album.id)}>
            <IconButton onClick={play}>
                {!active
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + album.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{album.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{album.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default AlbumItem;