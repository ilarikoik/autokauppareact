import { useState } from 'react'
import './App.css'
import { AppBar, Toolbar, Typography } from '@mui/material'
import CarList from './components/CarList'

function App() {

  return (
    <>
    <AppBar variant='sticky'> 
    <Toolbar>
      <Typography variant="h6">
            CarApp
      </Typography>
    </Toolbar>
    </AppBar> 
           <CarList></CarList>
    </>
  )
}

export default App
