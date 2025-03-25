import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import AuthContext from "../Contextes/AuthContext";
import RoomsService from "../Services/RoomsService";
import ServicesService from "../Services/ServicesService";
import { useNavigate, useParams } from "react-router-dom";
import ReservationsService from "../Services/ReservationsService";
import IncluresService from "../Services/IncluresService";
import { toast } from "react-toastify";

const ReservationsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [room, setRoom] = useState({});
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [total, setTotal] = useState(0);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [nombreNuits, setNombreNuits] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [totalServices, setTotalServices] = useState(0);
    const navigate = useNavigate();


    const fetchRoom = async () => {
        try {
            const response = await RoomsService.getRoomById(id);
            setRoom(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await ServicesService.getServices();
            setServices(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            
            const reservation = {
                id_room: room.id_room,
                id_client: user.id,
                check_in_date: dateDebut,
                check_out_date: dateFin,
                total_cost: total,
                reservation_status: 'En attende de validation',
            };
            
            const response = await ReservationsService.createReservation(reservation);
           
            selectedServices.map(async service => {
                const reservationService = {
                    id_service: service.id_service,
                    id_reservation : response.data.id_reservation,
                    quantity : 1,
                    total_price : service.price,
                };
                await IncluresService.createInclure(reservationService);
            })

            toast.success('Réservation effectuée avec succès');
            navigate('/payment/'+response.data.id_reservation);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRoom();
        fetchServices();
    }, []);

    const handleServiceChange = (service, isChecked) => {
        let updatedServices = [...selectedServices];
        if (isChecked) {
            updatedServices.push(service);
        } else {
            updatedServices = updatedServices.filter(s => s.id_service !== service.id_service);
        }
        setSelectedServices(updatedServices);
        const servicesTotal = updatedServices.reduce((acc, curr) => parseFloat(acc) + parseFloat(curr.price), 0);
        setTotalServices(servicesTotal);
    };


    useEffect(() => {

        if (dateDebut && dateFin) {
            console.log(dateDebut, dateFin);
            const date1 = new Date(dateDebut);
            const date2 = new Date(dateFin);
            const diffTime = Math.abs(date2 - date1);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log(diffDays);
            setNombreNuits(diffDays);
            setSubTotal(parseFloat(room.price_per_night) * diffDays);

        }
    }, [dateDebut, dateFin]);

    useEffect(() => {
        setTotal(parseFloat(subTotal) + parseFloat(totalServices));
    }, [subTotal, totalServices]);

    return (
        <Container className="mt-4">
            <h1>Confirmation de Réservation</h1>
            {room && (
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>Chambre {room.room_number}</Card.Title>
                        <Card.Text>
                            <li>Type de chambre : {room.room_type}</li>
                            <li>Prix par nuit : {room.price_per_night} €</li>
                            <li>Capacité : {room.capacity}</li>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Informations Utilisateur</Card.Title>
                    <Card.Text>
                        <li>Nom : {user.nom} {user.prenom}</li>
                        <li>Email : {user.email}</li>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Ajouter des Services</Card.Title>
                    <Form>
                        {services.map(service => (
                            <Form.Check
                                key={service.id_service}
                                type="checkbox"
                                label={`${service.service_name} - ${service.price} €`}
                                onChange={(e) => handleServiceChange(service, e.target.checked)}
                            />
                        ))}
                    </Form>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Date de réservation</Card.Title>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Date d'arrivée</Form.Label>
                                    <Form.Control type="date" value={dateDebut} onChange={(e) => { setDateDebut(e.target.value) }} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Date de départ</Form.Label>
                                    <Form.Control type="date" value={dateFin} onChange={(e) => { setDateFin(e.target.value) }} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body className="d-flex flex-column ">
                    <Card.Title>Total</Card.Title>
                    <Card.Text>
                        <li>Sous-total : {subTotal} €</li>
                        <li>Services : {totalServices} €</li>
                        <li>Total : {total} €</li>
                    </Card.Text>
                    <Button variant="primary" className="col-12" onClick={handleSubmit}>Confirmer la Réservation</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ReservationsPage;