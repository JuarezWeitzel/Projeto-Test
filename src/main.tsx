import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './App'
import './index.css'
import { LocalizationProvider, deDE } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider adapterLocale='pt-br' dateAdapter={AdapterDayjs}>
      <RouterProvider  router={router}/>
    </LocalizationProvider>
  </React.StrictMode>,
)
