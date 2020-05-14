import React from 'react'
import { Navbar, NavDropdown, Nav} from 'react-bootstrap'

export default class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">AWS Mock</Navbar.Brand>
        <Nav>
          <NavDropdown title="Services" id="nav-dropdown">
            <NavDropdown.Item href="/ec2">EC2</NavDropdown.Item>
            <NavDropdown.Item href="/s3">S3</NavDropdown.Item>
            <NavDropdown.Item href="/vpc">VPC</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }
}