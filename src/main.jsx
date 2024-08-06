import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/reset.css'
import './index.css'
import './assets/css/responsive.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { BrowserRouter as Router , HashRouter } from 'react-router-dom'
import './../node_modules/swiper/swiper-bundle.css';
import './../node_modules/swiper/swiper-bundle.min.css';
import './../node_modules/swiper/modules/navigation.min.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>

  </Provider>
)