import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Container, Form } from "react-bootstrap";
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from "@mui/material";
import moment from "moment";
import ReservationsService from "../Services/ReservationsService";
import ModalCreateReservations from "../Components/ModalCreateReservations";
import ModalUpdateReservations from "../Components/ModalUpdateReservations";
import ModalDeleteReservations from "../Components/ModalDeleteReservations";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AdminReservationsPage = () => {
    const [reservations, setReservations] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [reservationSelected, setReservationSelected] = useState(null);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredReservations, setFilteredReservations] = useState([]);
    const columns = [
        {
            name: 'Id',
            selector: row => row.id_reservation,
            sortable: true
        },
        {
            name: 'Date de début',
            selector: row => moment(row.check_in_date).format('DD/MM/YYYY'),
            sortable: true
        },
        {
            name: 'Date de fin',
            selector: row => moment(row.check_out_date).format('DD/MM/YYYY'),
            sortable: true
        },

        {
            name: 'Coût total',
            selector: row => row.total_cost,
            sortable: true
        },
        {
            name: 'Status',
            selector: row => row.reservation_status,
            sortable: true
        },

        {
            name: 'Id Chambre',
            selector: row => row.id_room,
            sortable: true
        },

        {
            name: 'Id Client',
            selector: row => row.id_client,
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row) => <div>
                <Tooltip title="Modifier la réservation">
                    <IconButton onClick={() => {
                        setReservationSelected(row);
                        setModalUpdate(true);
                    }}>
                        <EditIcon color="action" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer la réservation">
                    <IconButton onClick={() => {
                        setReservationSelected(row);
                        setModalDelete(true);
                    }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Valider la réservation">
                    <IconButton onClick={() => {
                        let newReservation = row;
                        newReservation.reservation_status = 'Valider';
                        ReservationsService.updateReservation(newReservation);
                        fetchReservations();
                    }}>
                        <CheckCircleOutlineIcon color="success" />
                    </IconButton>
                </Tooltip>
            </div>
        }
    ];

    useEffect(() => {
        if (searchValue) {
            const filteredData = reservations.filter(reservation =>
                reservation.id_client.toString().includes(searchValue) ||
                reservation.id_room.toString().includes(searchValue) ||
                reservation.reservation_status.toLowerCase().includes(searchValue) ||
                moment(reservation.check_in_date).format('DD/MM/YYYY').includes(searchValue) ||
                moment(reservation.check_out_date).format('DD/MM/YYYY').includes(searchValue) ||
                reservation.total_cost.toString().includes(searchValue)
            );
            setFilteredReservations(filteredData);
        } else {
            setFilteredReservations(reservations);
        }
    }, [searchValue]);

    const fetchReservations = async () => {
        try {
            const response = await ReservationsService.getReservations();
            setReservations(response.data);
            setFilteredReservations(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }
    useEffect(() => {
        fetchReservations();
    }, []);

    return <Container className="d-flex flex-column align-items-center">
        <h1>Admin Reservations</h1>
        <div className="d-flex justify-content-end align-items-center w-100">
            <Form>
                <Form.Control type="text" placeholder="Rechercher une réservation" value={searchValue} onChange={handleChange} />
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
            data={filteredReservations}
            pagination
            highlightOnHover
            responsive
        />
        <ModalCreateReservations open={modalCreate} setOpen={setModalCreate} fetchReservations={fetchReservations} />
        <ModalUpdateReservations open={modalUpdate} setOpen={setModalUpdate} fetchReservations={fetchReservations} currentReservations={reservationSelected} />
        <ModalDeleteReservations open={modalDelete} setOpen={setModalDelete} fetchReservations={fetchReservations} currentReservation={reservationSelected} />
    </Container>;
}

export default AdminReservationsPage;