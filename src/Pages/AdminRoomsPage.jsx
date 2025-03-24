import { useState } from "react";
import RoomsService from "../Services/RoomsService";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Container, Form } from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from "@mui/material";
import ModalCreateRooms from "../Components/ModalCreateRooms";
import ModalUpdateRooms from "../Components/ModalUpdateRooms";
import ModalDeleteRooms from "../Components/ModalDeleteRooms";

const AdminRoomsPage = () => {
    const [rooms, setRooms] = useState([]);
    const [roomSelected, setRoomSelected] = useState(null);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredRooms, setFilteredRooms] = useState([]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id_room,
            sortable: true
        },
        {
            name: 'Numéro de chambre',
            selector: row => row.room_number,
            sortable: true
        },
        {
            name: 'Capacité',
            selector: row => row.capacity,
            sortable: true
        },
        {
            name: 'Prix par nuitée',
            selector: row => row.price_per_night,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true
        },

        {
            name: 'Type de chambre',
            selector: row => row.room_type,
            sortable: true
        },

        {
            name: 'Actions',
            cell: (row) => <div>
                <Tooltip title="Modifier la chambre">
                    <IconButton onClick={() => {
                        setRoomSelected(row);
                        setModalUpdate(true);
                    }}>
                        <EditIcon color="action" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer la chambre">
                    <IconButton onClick={() => {
                        setRoomSelected(row);
                        setModalDelete(true);
                    }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </div>
        }
    ];

    const fetchRooms = async () => {
        try {
            const response = await RoomsService.getRooms();
            setRooms(response.data);
            setFilteredRooms(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    useEffect(() => {
        if (searchValue) {
            const filteredData = rooms.filter(room =>
                room.room_number.toString().includes(searchValue) ||
                room.capacity.toString().includes(searchValue) ||
                room.price_per_night.toString().includes(searchValue) ||
                room.room_type.toLowerCase().includes(searchValue) ||
                room.status.toString().includes(searchValue)
            );
            setFilteredRooms(filteredData);
        } else {
            setFilteredRooms(rooms);
        }
    }, [searchValue]);

    return <>
        <Container className="d-flex flex-column align-items-center">
            <h1>Admin Chambres</h1>
            <div className="d-flex justify-content-end align-items-center w-100">
                <Form>
                    <Form.Control type="text" placeholder="Rechercher une chambre" value={searchValue} onChange={handleChange} />
                </Form>
                <Tooltip title="Ajouter une chambre">
                    <IconButton size="large" onClick={() => setModalCreate(true)}>
                        <AddIcon color="info" fontSize="large" />
                    </IconButton>
                </Tooltip>
            </div>
            <DataTable
                striped
                columns={columns}
                data={filteredRooms}
                pagination
                highlightOnHover
                responsive
            />
        </Container>;
        <ModalCreateRooms open={modalCreate} setOpen={setModalCreate} fetchRooms={fetchRooms} />
        <ModalUpdateRooms open={modalUpdate} setOpen={setModalUpdate} fetchRooms={fetchRooms} currentRoom={roomSelected} />
        <ModalDeleteRooms open={modalDelete} setOpen={setModalDelete} fetchRooms={fetchRooms} currentRoom={roomSelected} />
    </>
}

export default AdminRoomsPage;