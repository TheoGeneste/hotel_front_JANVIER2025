import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";
import ReservationsService from "../Services/ReservationsService";

const ModalDeleteReservations = ({ open, setOpen, fetchReservations, currentReservation }) => {

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ReservationsService.deleteReservation(currentReservation.id_reservation);
            fetchReservations();
            toast.success('Réservation supprimé avec succès');
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression de la Réservation');
        }
    }

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Supprimé une réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
            Etes vous sûr de vouloir supprimer la réservation {currentReservation&&currentReservation.id_reservation }?
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

export default ModalDeleteReservations;