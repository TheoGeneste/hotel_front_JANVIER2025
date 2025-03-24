import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";
import ClientsServices from "../Services/ClientsServices";
import ServicesService from "../Services/ServicesService";

const ModalUpdateServices = ({ open, setOpen,fetchServices, currentService }) => {
    const [service, setService] = useState({
        service_name: "",
        description: "",
        price: ""
    });

    const handleChange = (e) => {
        setService({
            ...service,
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ServicesService.updateService(service);
            fetchServices();
            toast.success('Service modifié avec succès');
            setService({
                service_name: "",
                description: "",
                price: ""
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la modification du Service');
        }
    }

    useEffect(() => {
        if(currentService){
            setService(currentService);
        }
    }, [currentService]);

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Modification d'un Service</Modal.Title>
        </Modal.Header>
        <Form className="text-dark" onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Libelle</Form.Label>
                    <Form.Control type="text" placeholder="ex: WI-FI" value={service.service_name} name="service_name" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="ex: description" value={service.description} name="description" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Prix</Form.Label>
                    <Form.Control type="number" placeholder="ex: 500" value={service.price} name="price" onChange={handleChange} />
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

export default ModalUpdateServices;