import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Top from './top/Top'
import Users from './users/Users'
import AWS from 'aws-sdk'
// react-bootstrap を使うために import する
// App で import することで子コンポーネントでも有効になる
import 'bootstrap/dist/css/bootstrap.min.css'

export default class App extends React.Component {
  render() {
    const credential = new AWS.Credentials({
      accessKeyId: 'akid', secretAccessKey: 'secret', sessionToken: 'session'
    });
    const ec2 = new AWS.EC2({endpoint: "http://localhost:4566", region: "us-east-1", credentials: credential})
    ec2.describeVpcs(function(err, data) {
      if (err) { 
        console.log(err, err.stack)
      } else {
        console.log(data.Vpcs)
      }
    })
    return (
      <BrowserRouter>
        <Route exact path='/' component={Top} />
        <Route exact path='/users' component={Users} />
      </BrowserRouter>
    )
  }
}