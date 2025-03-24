import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";
import ClientsServices from "../Services/ClientsServices";

const ModalCreateClients = ({ open, setOpen,fetchClients }) => {
    const [client, setClient] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password : ""
    });

    const handleChange = (e) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ClientsServices.createClient(client);
            fetchClients();
            toast.success('Client créée avec succès');
            setClient({
                first_name: "",
                last_name: "",
                email: "",
                phone: "",
                password : ""
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la création du Client');
        }
    }

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Crée un client</Modal.Title>
        </Modal.Header>
        <Form className="text-dark" onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control type="text" placeholder="ex: Jean" value={client.first_name} name="first_name" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" placeholder="ex: DUPONT" value={client.last_name} name="last_name" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numéro de téléphone</Form.Label>
                    <Form.Control type="text" placeholder="ex: 0612458795" value={client.phone} name="phone" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="mail" placeholder="ex: 0612458795" value={client.email} name="email" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="*******" value={client.password} name="password" onChange={handleChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Annuler
                </Button>
                <Button variant="primary" type="submit" value={"Valider"}>
                    Valider
                </Button>
            </Modal.Footer>
        </Form>

    </Modal>;
}

export default ModalCreateClients;