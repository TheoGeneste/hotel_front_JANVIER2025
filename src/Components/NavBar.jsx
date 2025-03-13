import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();


    return <>
        <Navbar expand="lg" variant="dark" bg="dark">
            <Container fluid>
                <Navbar.Brand onClick={() => {navigate("/")}}>Hotel ForEach</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {navigate("/")}}>Accueil</Nav.Link>
                        <Nav.Link onClick={() => {navigate("/rooms")}}>Chambres</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav.Link className="link-login" onClick={() => {navigate("/login")}}>Connexion</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default NavBar;