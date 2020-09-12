import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Top from './top/Top'
import Vpc from './vpc/Vpc'
import S3 from './s3/S3'
import S3NewBucket from './s3/S3NewBucket'

export default class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Top} />
        <Route exact path='/vpc' component={Vpc} />
        <Route exact path='/s3' component={S3} />
        <Route exact path='/s3/bucket/new' component={S3NewBucket} />
      </BrowserRouter>
    )
  }
}