import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './pages/Home' // carrega o index
import { Details } from './pages/Details'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/global'

import Theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Home />
    </ThemeProvider>
  </React.StrictMode>,
)
