import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NabvarComponent() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand as={NavLink} to={'/'}>Helper memory</Navbar.Brand>
			<Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
			<Navbar.Collapse id="main-menu">
				<Nav className="mr-auto">
					<Nav.Link >Creat a Post</Nav.Link>
				</Nav>
				<Nav>
					<React.Fragment>
						<Nav.Link as={NavLink} to={'/signup'}>Creat account</Nav.Link>
						<Nav.Link as={NavLink} to={'/signin'}>Sign in</Nav.Link>
					</React.Fragment>

					<NavDropdown id="menu-dropdown">
						<NavDropdown.Item>My Posts</NavDropdown.Item>
						<NavDropdown.Item>Log out</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
