import React from 'react'
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap"

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand href="/">Proshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/cart"><i class="fas fa-shopping-cart" aria-hidden="true"></i> Cart</Nav.Link>
                            <Nav.Link href="/sigh-in"><i class="fas fa-user" aria-hidden="true"></i> Sign In</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header