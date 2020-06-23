import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Top from './top/Top'
import Vpc from './vpc/Vpc'

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Top} />
        <Route exact path='/vpc' component={Vpc} />
      </BrowserRouter>
    )
  }
}