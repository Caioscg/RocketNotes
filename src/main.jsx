import React from 'react'
import ReactDOM from 'react-dom/client'

import { Home } from './pages/Home' // carrega o index
import { Details } from './pages/Details'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import { New } from './pages/New'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/global'

import Theme from './styles/theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <New />
    </ThemeProvider>
  </React.StrictMode>,
)
