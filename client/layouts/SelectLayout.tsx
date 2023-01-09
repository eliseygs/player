import React from 'react';
import {Checkbox, Container } from "@mui/material";

interface SelectLayoutProps {
    children:React.ReactNode;
    props:any
}

const SelectLayout: React.FC<SelectLayoutProps>
    = ({
           props,
           children
       }) => {
    return (
        <>
            <Container style={{display:'flex'}}>
                {children}
            <Checkbox defaultChecked style={{marginLeft: "auto"}} />
            </Container>
        </>
    );
};

export default SelectLayout;