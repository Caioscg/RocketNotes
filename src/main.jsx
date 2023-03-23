import React from 'react'
import ReactDOM from 'react-dom/client'
import { Details } from './pages/Details' // carrega o index
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/global'

import Theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Details />
    </ThemeProvider>
  </React.StrictMode>,
)
