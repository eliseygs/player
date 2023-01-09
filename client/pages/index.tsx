import { ButtonBase } from '@mui/material'
import React from "react"
import Navbar from '../components/Navbar'
import MainLayout from '../layouts/MainLayout'

const Index = () => {
  return (
    <MainLayout>
    <div className="center">
      <h1>welcome</h1>
      <h3>better traks</h3>
    </div>


    <style jsx>
      {
        `
        .center{
          margin-top: 150px;
          display: flex;
          flex-direction:column;
          align-items: center;
          justify-content: center;`
      }
      </style>
    </MainLayout>
  )
}

export default Index