import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@mui/material";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";
import ChooseLayout from '../../layouts/SelectLayout';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const {tracks, error} = useTypedSelector(state => state.track)
    const name = useInput('')
    const author = useInput('')
    const router = useRouter()

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('author', author.value)
            if(picture ){
                formData.append('picture', picture)
            }
            axios.post('http://localhost:5000/albums', formData)
                .then(resp => router.push('/albums'))
                .catch(e => console.log(e))
        }
    }

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                <Grid container direction={"column"} style={{padding: 20}}>
                    <TextField
                        {...name}
                        style={{marginTop: 10}}
                        label={"Название album"}
                    />
                    <TextField
                        {...author}
                        style={{marginTop: 10}}
                        label={"name autor"}
                    />
                </Grid>
                }
                {activeStep === 1 &&
                <FileUpload setFile={setPicture} accept="image/*">
                    <Button>Загрузить изображение</Button>
                </FileUpload>
                }
                {activeStep === 2 &&
                        <TrackList tracks={tracks}/> 
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;