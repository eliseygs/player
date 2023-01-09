
import { Button, Card, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import MainLayout from '../../layouts/MainLayout';
import {NextThunkDispatch, wrapper} from "../../store";
import AlbumList from '../../components/AlbumList';
import { fetchAlbums } from '../../store/actions-creators/album';
const Index = () => {
    const router= useRouter()
    const {albums, error} = useTypedSelector(state => state.album)

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
                                <h1>set albums</h1>
                                <Button onClick={() => router.push('/albums/create')}>upload</Button>
                            </Grid>
                    </Box>
                    <AlbumList albums={albums}/>
                    </Card>
                </Grid>
            </MainLayout>
    )
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(store =>  async () => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await (fetchAlbums()))
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
