import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";

const ModalUpdateRooms = ({ open, setOpen, fetchRooms, currentRoom }) => {
    const [room, setRoom] = useState({
        room_number: '',
        capacity: '',
        price_per_night: '',
        room_type: ''
    });

    const handleChange = (e) => {
        setRoom({
            ...room,
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RoomsService.updateRoom(room);
            fetchRooms();
            toast.success('Chambre modifiée avec succès');
            setRoom({
                room_number: '',
                capacity: '',
                price_per_night: '',
                room_type: ''
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la modification de la chambre');
        }
    }

    useEffect(() => {
        if (currentRoom) {
            setRoom(currentRoom);
        }
    }, [currentRoom])

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Modifié une chambre</Modal.Title>
        </Modal.Header>
        <Form className="text-dark" onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numéro de chambre</Form.Label>
                    <Form.Control type="number" placeholder="ex: 101" value={room.room_number} name="room_number" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Capacité</Form.Label>
                    <Form.Control type="number" placeholder="ex: 1" value={room.capacity} name="capacity" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Prix par nuitée</Form.Label>
                    <Form.Control type="number" placeholder="ex: 50" value={room.price_per_night} name="price_per_night" onChange={handleChange} />
                </Form.Group>
                <Form.Check // prettier-ignore
                    type="switch"
                    label="Disponible"
                    checked={room.status}
                    name="status"
                    onChange={(e) => setRoom({ ...room, status: !room.status })}
                />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type de chambre</Form.Label>
                    <Form.Select aria-label="select" value={room.room_type} name="room_type" onChange={handleChange}>
                        <option>Selectionné le type de chambre</option>
                        <option value="simple">Simple</option>
                        <option value="double">Double</option>
                        <option value="suite">Suite</option>
                    </Form.Select>
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

export default ModalUpdateRooms;