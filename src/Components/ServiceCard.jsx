import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import simple from '../assets/simple.jpg';
import double from '../assets/double.jpg';
import suite from '../assets/suite.jpg';
import { useContext } from 'react';
import AuthContext from '../Contextes/AuthContext';


const ServiceCard = ({ service }) => {
    const {role} = useContext(AuthContext);

    return <>
        <Card style={{ width: '18rem' }}>
            <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>{service.service_name}</Card.Title>
                <Card.Text className='align-self-start'> 
                    {service.description}
                    <li>Prix : {service.price}</li>
                </Card.Text>
                <Button variant="primary">Réserver</Button>
            </Card.Body>
        </Card>
    </>;
}

export default ServiceCard;