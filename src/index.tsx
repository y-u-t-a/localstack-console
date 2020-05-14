import React from 'react'
import ReactDOM from 'react-dom'
import NavigationBar from './common/NavigationBar'
import App from './App'
// react-bootstrap を使うために import する
// index.tsx で import することですべてのコンポーネントでも有効になる
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <NavigationBar />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)