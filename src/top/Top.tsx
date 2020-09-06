import React from 'react'
import Const from '../common/Const'
import { Container } from 'react-bootstrap'

export default class Top extends React.Component {
  render() {
    document.title = Const.BASE_PAGE_TITLE
    return (
      <Container>
        <h1>サービス一覧</h1>
        <ul>
          <li><a href="/s3">S3</a></li>
          <li><a href="/vpc">VPC</a></li>
          <li><a href="/ec2">EC2</a></li>
        </ul>
      </Container>
    )
  }
}