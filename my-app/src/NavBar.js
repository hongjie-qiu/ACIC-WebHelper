import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Navbar, NavItem } from 'react-bootstrap';
// import '../../css/App.css';

// const navbar_color = {backgroundColor: '#ABEBFF'};

// const tabs = {fontWeight: 'bold'};
// const user = {color: 'white'};

function NavBar() {
    return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">ACIC Helper</Navbar.Brand>
        <Nav className="me-auto">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav>
              <NavItem href="https://faculty.washington.edu/jscholl/dgrl/criteria.php" as="a" target="_blank" className="nav-link">
                DGRL
              </NavItem>
              <NavItem href="https://faculty.washington.edu/jscholl/dirl/" as="a" target="_blank" className="nav-link">
                DIRL
              </NavItem>
            </Nav>
        </Nav>
        <Nav className='profName'>
            <NavItem href="https://faculty.washington.edu/jscholl" as="a" target="_blank" className="nav-link">
            Professor Hans Jochen Scholl
            </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );

}

export default NavBar;