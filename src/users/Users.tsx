import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import UserList from './UserList'

export default class Users extends React.Component {
  render() {
    return (
      <div>
        <h2>ユーザー一覧</h2>
        <Breadcrumb>
          <BreadcrumbItem href="/">Top</BreadcrumbItem>
          <BreadcrumbItem active>Users</BreadcrumbItem>
        </Breadcrumb>
        <UserList/>
      </div>
    )
  }
}