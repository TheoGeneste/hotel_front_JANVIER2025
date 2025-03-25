import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ClientsServices from "../Services/ClientsServices";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
    const {token} = useParams();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(password !== passwordConfirm){
                toast.error('Les mots de passe ne correspondent pas');
                return;
            }
            const response = await ClientsServices.resetPassword(token, { password });
            toast.success('Mot de passe modifié avec succès');
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la modification du mot de passe');
        }
    }

    return <Container className="d-flex flex-column align-items-center ">
        <h1>Reset Password</h1>
        <Form onSubmit={handleSubmit} className="w-50">
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm your password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-5">
                Submit
            </Button>
        </Form>

    </Container>;
}
 
export default ResetPasswordPage;