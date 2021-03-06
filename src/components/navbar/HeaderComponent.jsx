import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './logo1.svg'
import { Link } from "react-router-dom";
import './Header.css'
/* 
  const currentUser = sessionStorage.getItem("USER_NAME_SESSION_ATTRIBUTE_NAME"); */
  
const HeaderComponent = (props) => {
  return (
    <div>
      <header>
        <Navbar bg="white" expand="sm" className="mb-3">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="120"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/fields">Fields</Nav.Link>
                <Nav.Link href="/responses">Responses</Nav.Link>
                <NavDropdown
                  title={props.username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/changeProfile">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/editPassword">
                    Change Password
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/logout">
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};
export default HeaderComponent;
