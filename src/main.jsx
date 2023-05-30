import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes } from './routes'
import { ThemeProvider } from 'styled-components' 

import { AuthProvider } from './hooks/auth'

import GlobalStyles from './styles/global'

import Theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes /> 
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
