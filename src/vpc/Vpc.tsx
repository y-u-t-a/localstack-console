import React from 'react'
import AwsClients from '../common/AwsClients'
import Const from '../common/Const'

export default class Vpc extends React.Component {
  render() {
    document.title = `VPC | ${ Const.BASE_PAGE_TITLE }`
    getVpc()
    return (
      <div>
        <h3>VPC一覧</h3>
      </div>
    )
  }
}

async function getVpc() {
  const vpcInfo = await AwsClients.ec2.describeVpcs().promise()
  console.log(vpcInfo.Vpcs![0])
}