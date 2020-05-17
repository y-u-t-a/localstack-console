import React from 'react'
import Const from '../common/Const'

export default class Top extends React.Component {
  render() {
    document.title = Const.BASE_PAGE_TITLE
    return (
      <div>
        <h3>サービス一覧</h3>
        <ul>
          <li><a href="/s3">S3</a></li>
          <li><a href="/vpc">VPC</a></li>
          <li><a href="/ec2">EC2</a></li>
        </ul>
      </div>
    )
  }
}