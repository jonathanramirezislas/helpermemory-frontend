import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function NabvarComponent() {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand>Helper memory</Navbar.Brand>
			<Navbar.Toggle aria-controls="main-menu"></Navbar.Toggle>
			<Navbar.Collapse id="main-menu">
				<Nav className="mr-auto">
					<Nav.Link>Creat a Post</Nav.Link>
				</Nav>
				<Nav>
					<React.Fragment>
						<Nav.Link>Creat account</Nav.Link>
						<Nav.Link>Log in</Nav.Link>
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
