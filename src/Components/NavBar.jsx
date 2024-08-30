import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Navbar fixed="top" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/'>SK Course's</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to='/home' disabled>Home</Nav.Link>
                            <Nav.Link as={Link} to='/register' >Register</Nav.Link>
                            <Nav.Link as={Link} to='/login' >Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;