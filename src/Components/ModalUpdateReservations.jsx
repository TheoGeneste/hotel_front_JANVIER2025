import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";
import ClientsServices from "../Services/ClientsServices";
import ReservationsService from "../Services/ReservationsService";
import moment from "moment";

const ModalUpdateReservations = ({ open, setOpen,fetchReservations, currentReservations }) => {
    const [reservations, setReservations] = useState({
        check_in_date: "",
        check_out_date: "",
        total_cost: "",
        id_room: "",
        id_client : ""
    });

    const [rooms, setRooms] = useState([]);
    const [clients, setClients] = useState([]);


    const fetchRooms = async () => {
        try {
            const response = await RoomsService.getRooms();
            setRooms(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchClients = async () => {
        try {
            const response = await ClientsServices.getClients();
            setClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
    
        setReservations({
            ...reservations,
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ReservationsService.updateReservation(reservations);
            fetchReservations();
            toast.success('Reservation créée avec succès');
            setReservations({
                check_in_date: "",
                check_out_date: "",
                total_cost: "",
                id_room: "",
                id_client : ""
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la création de la Reservation');
        }
    }

    useEffect(() => {
        fetchRooms();
        fetchClients();
    }, [])

    useEffect(() => {
        if (currentReservations) {
            
            setReservations(currentReservations);
        }
    }, [currentReservations])
    
    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Modifier une réservation</Modal.Title>
        </Modal.Header>
        <Form className="text-dark" onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date d'arrivé</Form.Label>
                    <Form.Control type="datetime-local" placeholder="ex: 24/03/2025 14:00" value={moment(reservations.check_in_date).format("YYYY-MM-DDTHH:mm")} name="check_in_date" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Date de départ</Form.Label>
                    <Form.Control type="datetime-local" placeholder="ex: 24/03/2025 14:00" value={moment(reservations.check_out_date).format("YYYY-MM-DDTHH:mm")} name="check_out_date" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Coût total</Form.Label>
                    <Form.Control type="number" placeholder="ex: 500" value={reservations.total_cost} name="total_cost" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={reservations.reservation_status} name="reservation_status" onChange={handleChange}>
                        <option> Choisir votre status</option>
                        <option value="En attende de validation">En attende de validation</option>
                        <option value="Valider">Valider</option>
                        <option value="Passer">Passer</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Chambre</Form.Label>
                    <Form.Select value={reservations.id_room} name="id_room" onChange={handleChange}>
                        <option> Choisir une chambre</option>
                        {
                            rooms.map((room, index) => <option key={index} value={room.id_room}>{room.room_number}</option>)
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Client</Form.Label>
                    <Form.Select value={reservations.id_client} name="id_client" onChange={handleChange}>
                        <option> Choisir un client</option>
                        {
                            clients.map((client, index) => <option key={index} value={client.id_client}>{client.first_name} {client.last_name}</option>)
                        }
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

export default ModalUpdateReservations;