import { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../Contextes/AuthContext";
import ReservationsService from "../Services/ReservationsService";

import IncluresService from "../Services/IncluresService";
import RoomsService from "../Services/RoomsService";
import { toast } from "react-toastify";
import moment from "moment";
import PaymentsService from "../Services/PaymentsService";
import PayerService from "../Services/PayerService";

const PaymentMethodPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [reservation, setReservation] = useState({});
    const [services, setServices] = useState([]);
    const [paymentType, setPaymentType] = useState("Carte Bancaire");
    const [installments, setInstallments] = useState(1);
    const navigate = useNavigate();

    const fetchReservation = async () => {
        try {
            const response = await ReservationsService.getReservationById(id);
            const responseBis = await IncluresService.getServiceForReservations(id);
            const responseTer = await RoomsService.getRoomById(response.data.id_room);
            setReservation({ ...responseTer.data, ...response.data });
            setServices(responseBis.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReservation();
    }, []);

    const handlePayment = async () => {
        try {
            const totalAmount = reservation.total_cost;
            const installmentAmount = totalAmount / installments;
            let date = moment();
            for (let i = 0; i < installments; i++) {
                const payment = {
                    payment_method: paymentType,
                    payment_date: date.add(i, 'months').format('YYYY-MM-DD'),
                    amount: installmentAmount,
                };
                const res = await PaymentsService.createPayment(payment);
                await PayerService.createPayer({id_reservation :reservation.id_reservation, id_payment: res.data.id_payment});
            }

            toast.success('Paiement effectué avec succès');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Récapitulatif de la Réservation</h1>
            {reservation && (
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title>Réservation #{reservation.id_reservation}</Card.Title>
                        <Card.Text>
                            <li>Chambre : {reservation.room_number}</li>
                            <li>Prix total : {reservation.total_cost} €</li>
                            <li>Date d'arrivée : {moment(reservation.check_in_date).format("DD/MM/YYYY")}</li>
                            <li>Date de départ : {moment(reservation.check_out_date).format("DD/MM/YYYY")}</li>
                            <li>Services inclus :</li>
                            <ul>
                                {services.map(service => (
                                    <li key={service.id_service}>{service.service_name} - {service.price} €</li>
                                ))}
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Type de Paiement</Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Label>Type de paiement</Form.Label>
                            <Form.Control as="select" value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                                <option value="Carte Bancaire">Carte Bancaire</option>
                                <option value="Cheque">Chèque</option>
                                <option value="Virement">Virement</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Nombre de mensualités</Form.Label>
                            <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                value={installments}
                                onChange={(e) => setInstallments(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body className="d-flex flex-column">
                    <Button variant="primary" className="col-12" onClick={handlePayment}>Valider le Paiement</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PaymentMethodPage;