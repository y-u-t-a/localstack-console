import React from 'react'
import { Button } from 'react-bootstrap'

export default class Top extends React.Component {
  render() {
    return (
      <div>
        <h2>Top</h2>
        <Button href="/users" variant="primary">ユーザー一覧</Button>
      </div>
    )
  }
}