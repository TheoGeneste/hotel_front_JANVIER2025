import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Contextes/AuthContext";
import AuthService from "../Services/AuthService";
import '../Styles/NavBar.css';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const NavBar = () => {
    const navigate = useNavigate();
    const { isConnected, role, setIsConnected } = useContext(AuthContext);

    return <>
        <Navbar expand="lg" variant="dark" bg="dark" sticky="top">
            <Container fluid className="ps-5 pe-5">
                <Navbar.Brand onClick={() => { navigate("/") }}>Hotel ForEach</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link onClick={() => { navigate("/") }}>Accueil</Nav.Link> */}
                        <Nav.Link onClick={() => { navigate("/rooms") }}>Chambres</Nav.Link>
                        <Nav.Link onClick={() => { navigate("/services") }}>Services</Nav.Link>

                    </Nav>
                    {role == 'ADMIN' && isConnected == true && <>
                        <NavDropdown title={<SettingsIcon />} id="basic-nav-dropdown" className="link-login me-3" >
                            <NavDropdown.Item onClick={() => { navigate("/admin/rooms") }}>Chambre</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate("/admin/clients") }}>Clients</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate("/admin/reservations") }}>Réservations</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate("/admin/services") }}>Services</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate("/admin/payments") }}>Paiements</NavDropdown.Item>
                        </NavDropdown>
                    </>}
                    {isConnected == true ? <>
                        <NavDropdown title={<PersonIcon />} id="basic-nav-dropdown" className="link-login me-3" >
                            <NavDropdown.Item onClick={() => { navigate("/profile") }}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { AuthService.logout();setIsConnected(false); navigate('/') }}>Déconnexion</NavDropdown.Item>
                        </NavDropdown>
                        
                    </> : <>
                        <Nav.Link className="link-login" onClick={() => { navigate("/login") }}>Connexion</Nav.Link>
                    </>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
}

export default NavBar;