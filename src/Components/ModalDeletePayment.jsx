import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PaymentsService from "../Services/PaymentsService";

const ModalDeletePayment = ({ open, setOpen, fetchPayments, currentPayment }) => {

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await PaymentsService.deletePayment(currentPayment.id_payment);
            fetchPayments();
            toast.success('Payment supprimé avec succès');
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression du Payment');
        }
    }

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Supprimé un payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
            Etes vous sûr de vouloir supprimer le payment {currentPayment && currentPayment.id_paymentlea}?
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

export default ModalDeletePayment;