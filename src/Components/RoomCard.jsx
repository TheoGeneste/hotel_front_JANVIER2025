import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import simple from '../assets/simple.jpg';
import double from '../assets/double.jpg';
import suite from '../assets/suite.jpg';
import { useContext } from 'react';
import AuthContext from '../Contextes/AuthContext';


const RoomCard = ({ room }) => {
    const {role} = useContext(AuthContext);

    return <>
        <Card style={{ width: '18rem' }}>
            {room.room_type === "simple" && <Card.Img variant="top" src={simple} styles={{objectFit: "contain"}} height={200} />}
            {room.room_type === "double" && <Card.Img variant="top" src={double} styles={{objectFit: "contain"}} height={200} />}
            {room.room_type === "suite" && <Card.Img variant="top" src={suite}  styles={{objectFit: "contain"}} height={200}/>}
            <Card.Body className='d-flex flex-column align-items-center'>
                <Card.Title>{room.room_number}</Card.Title>
                <Card.Text className='align-self-start'>
                    <li>Type de chambre : {room.room_type}</li>
                    <li>Prix par nuit : {room.price_per_night}</li>
                    <li>Capacité : {room.capacity}</li>
                    {role == "admin" && <li>Disponible : {room.status}</li>}
                </Card.Text>
                <Button variant="primary">Réserver</Button>
            </Card.Body>
        </Card>
    </>;
}

export default RoomCard;