import React from 'react'
import AwsServices from '../common/AwsServices'

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
  AwsServices.ec2.describeVpcs((err, data) => {
    if (err) {
      console.log(err, err.stack)
    } else {
      console.log(data.Vpcs)
    }
  })
}