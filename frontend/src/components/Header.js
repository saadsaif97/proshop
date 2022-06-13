import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';

import { LinkContainer } from "react-router-bootstrap"
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { userLogout } from "../actions/userActions";

const Header = () => {

    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(userLogout())
        navigate('/')
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >Proshop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart" aria-hidden="true"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ?
                                <NavDropdown title={userInfo.name}>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                : (<LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user" aria-hidden="true"></i> Sign In</Nav.Link>
                                </LinkContainer>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header