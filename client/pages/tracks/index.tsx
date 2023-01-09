import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react'
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/actions-creators/track";
const Index = () => {
    const router= useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return ( 
            <MainLayout>
                <Grid container justifyContent="center">
                    <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent="space-between">
                                <h1>set tracks</h1>
                                <Button onClick={() => router.push('/tracks/create')}>upload</Button>
                            </Grid>
                    </Box>
                    <TrackList tracks={tracks}/> 
                    </Card>
                </Grid>
            </MainLayout>
    )
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(store =>  async () => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
    return{props:{}}
}
)

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
//     const dispatch= store.dispatch as NextThunkDispatch
//     await dispatch(await fetchTracks());

//     // console.log('State on server', store.getState());

//     return {
//         props: {},
//     };
// });
