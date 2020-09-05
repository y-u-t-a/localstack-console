import React from 'react'
import Const from '../common/Const'
import S3BucketList from './S3BucketList'
import { Container } from 'react-bootstrap'

export default class S3 extends React.Component {
  render() {
    document.title = `S3 | ${ Const.BASE_PAGE_TITLE }`
    return (
      <Container>
        <h3>S3 バケット一覧</h3>
        <S3BucketList />
      </Container>
    )
  }
}