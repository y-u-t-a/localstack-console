import React from 'react'
import AWS from 'aws-sdk'

export default class Vpc extends React.Component {
  render() {
    getVpc()
    return (
      <div>
        <h3>VPC一覧</h3>
      </div>
    )
  }
}

function getVpc() {
  const credential = new AWS.Credentials({
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
    sessionToken: 'dummy'
  })
  const ec2 = new AWS.EC2({
    endpoint: "http://localhost:4566",
    region: "us-east-1",
    credentials: credential
  })
  ec2.describeVpcs(function(err, data) {
    if (err) { 
      console.log(err, err.stack)
    } else {
      console.log(data.Vpcs)
    }
  })
}