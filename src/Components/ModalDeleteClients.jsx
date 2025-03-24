import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";
import ClientsServices from "../Services/ClientsServices";

const ModalDeleteClients = ({ open, setOpen, fetchClients, currentClient }) => {

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ClientsServices.deleteClient(currentClient.id_client);
            fetchClients();
            toast.success('Client supprimé avec succès');
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression du Client');
        }
    }

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Supprimé un client</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
            Etes vous sûr de vouloir supprimer le client {currentClient && currentClient.last_name + " " + currentClient.first_name}?
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
                Annuler
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Valider
            </Button>
        </Modal.Footer>

    </Modal>;
}

export default ModalDeleteClients;