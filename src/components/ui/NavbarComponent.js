import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../actions/authActions';


export default function NabvarComponent() {

	const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand as={NavLink} to={'/'}>
				Helper memory
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
			<Navbar.Collapse id="main-menu">
				<Nav className="mr-auto">{loggedIn && <Nav.Link>Creat a Post</Nav.Link>}</Nav>
				<Nav>
					{!loggedIn ? (
						<>
							<Nav.Link as={NavLink} to={'/signup'}>
								Creat account
							</Nav.Link>
							<Nav.Link as={NavLink} to={'/signin'}>
								Sign in
							</Nav.Link>
						</>
					) : (
						<NavDropdown id="menu-dropdown">
							<NavDropdown.Item>My Posts</NavDropdown.Item>
							<NavDropdown.Item onClick={() => dispatch(logoutUser())}>Log out</NavDropdown.Item>
						</NavDropdown>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
