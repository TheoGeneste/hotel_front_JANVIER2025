import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import PaymentsService from "../Services/PaymentsService";
import moment from "moment";

const ModalUpdatePayment = ({ open, setOpen,fetchPayments, currentPayment }) => {
    const [payment, setPayment] = useState({
        payment_date: moment().format('YYYY-MM-DD'),
        amount: 0,
        payment_method: ""
      });

    const handleChange = (e) => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await PaymentsService.updatePayment(payment);
            console.log(response);
            
            fetchPayments();
            toast.success('Payment modifié avec succès');
            setPayment({
                amount: 0,
                payment_method: ""
            });
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la modification du Payment');
        }
    }

    useEffect(() => {
        if(currentPayment){
            setPayment(currentPayment);
        }
    }, [currentPayment])

    return <Modal show={open} onHide={handleClose} position="center">
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Crée un payment</Modal.Title>
        </Modal.Header>
        <Form className="text-dark" onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Montant</Form.Label>
                    <Form.Control type="number" placeholder="ex: 150" value={payment.amount} name="amount" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Paiement Méthode</Form.Label>
                    <Form.Select value={payment.payment_method} name="payment_method" onChange={handleChange}>
                        <option value="">Choisir une méthode de paiement</option>
                        <option value="Carte Bancaire">Carte Bancaire</option>
                        <option value="Cheque">Chèque</option>
                        <option value="Virement">Virement</option>
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

export default ModalUpdatePayment;