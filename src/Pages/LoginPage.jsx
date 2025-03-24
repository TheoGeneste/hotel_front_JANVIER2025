import { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthService from '../Services/AuthService';
import AuthContext from '../Contextes/AuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [currentUser, setCurrentUser] = useState({
        email: '',
        password: ''
    });
    const {setIsConnected, setRole, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setCurrentUser({...currentUser, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await AuthService.login(currentUser);
            const data = jwtDecode(response.data.token);
            axios.defaults.headers['Authorization'] = 'Bearer ' + response.data.token;
            setRole(data.role);
            setUser({
                id: data.id,
                email: data.email,
                nom : data.nom,
                prenom : data.prenom
            })
            setIsConnected(true);
            window.localStorage.setItem('token', response.data.token);
            toast.success('Bonjour ' + data.prenom + ' ' + data.nom);
            navigate('/');
        }catch(error){
            console.log(error);
            toast.error('Erreur lors de la connexion, veuillez vérifier vos identifiants');
        }
    }

    return <Container className='d-flex flex-column align-items-center mt-5'>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={currentUser.email} name='email' onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={currentUser.password} name='password' onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Container>;
}

export default LoginPage;