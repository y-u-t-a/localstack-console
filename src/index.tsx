import React from 'react'
import ReactDOM from 'react-dom'
import NavigationBar from './common/NavigationBar'
import Router from './Router'
// react-bootstrap を使うために import する
// index.tsx で import することですべてのコンポーネントでも有効になる
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <div>
    <NavigationBar />
    <Router />
  </div>,
  document.getElementById('root')
)