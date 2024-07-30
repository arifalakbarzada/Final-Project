import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/styles'
import theme from './assets/theme/theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
  <Provider store={store}>
    <Router>
      <App />
    </Router>

  </Provider>
  </ThemeProvider>
)