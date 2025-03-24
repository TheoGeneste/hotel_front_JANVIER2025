import { useContext, useEffect, useState } from "react";
import RoomsService from "../Services/RoomsService";
import RoomCard from "../Components/RoomCard";
import { Container } from "react-bootstrap";
import AuthContext from "../Contextes/AuthContext";

const RoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const {isConnected, role, user} = useContext(AuthContext);

    console.log(isConnected, role, user);
    const fetchRooms = async () => {
        try {
            const response = await RoomsService.getRooms();
            setRooms(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRooms();
    }, []);
    
    return <Container className="d-flex flex-column align-items-center">
        <h1 className="mb-4">Nos Chambres</h1>
        <div className="d-flex flex-wrap justify-content-center  gap-3">
            {rooms.map((room, index) => {
                return <RoomCard key={index} room={room} />
            })}
        </div>
    </Container>;
}
 
export default RoomsPage;