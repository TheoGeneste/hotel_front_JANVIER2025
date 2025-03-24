import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";

const ModalDeleteRooms = ({ open, setOpen, fetchRooms, currentRoom }) => {

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RoomsService.deleteRoom(currentRoom.id_room);
            fetchRooms();
            toast.success('Chambre supprimé avec succès');
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression de la chambre');
        }
    }

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Supprimé une chambre</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
            Etes vous sûr de vouloir supprimer la chambre {currentRoom&&currentRoom.room_number}?
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

export default ModalDeleteRooms;