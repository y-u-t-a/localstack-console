import React from 'react'
import ReactDOM from 'react-dom'
import NavigationBar from './common/NavigationBar'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <NavigationBar />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)