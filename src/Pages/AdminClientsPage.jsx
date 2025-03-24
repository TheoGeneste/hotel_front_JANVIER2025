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
import ClientsServices from "../Services/ClientsServices";
import moment from "moment";
import ModalCreateClients from "../Components/ModalCreateClients";
import ModalUpdateClients from "../Components/ModalUpdateClients";
import ModalDeleteClients from "../Components/ModalDeleteClients";

const AdminClientsPage = () => {
    const [clients, setClients] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [clientSelected, setClientSelected] = useState(null);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id_client,
            sortable: true
        },
        {
            name: 'Prénom',
            selector: row => row.first_name,
            sortable: true
        },
        {
            name: 'Nom',
            selector: row => row.last_name,
            sortable: true
        },
        {
            name: 'Numéro de téléphone',
            selector: row => row.phone,
            sortable: true
        },
        {
            name: 'Date d\'inscription',
            selector: row => moment(row.registration_date).format('DD/MM/YYYY'),
            sortable: true
        },

        {
            name: 'Email',
            selector: row => <Tooltip title={row.email}>{row.email}</Tooltip>,
            sortable: true
        },

        {
            name: 'Actions',
            cell: (row) => <div>
                <Tooltip title="Modifier la chambre">
                    <IconButton onClick={() => {
                        setClientSelected(row);
                        setModalUpdate(true);
                    }}>
                        <EditIcon color="action" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer la chambre">
                    <IconButton onClick={() => {
                        setClientSelected(row);
                        setModalDelete(true);
                    }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </div>
        }
    ];

    const fetchClients = async () => {
        try {
            const response = await ClientsServices.getClients();
            setClients(response.data);
            setFilteredClients(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        if (searchValue) {
            const filteredData = clients.filter(client => 
                client.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                client.last_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                client.email.toLowerCase().includes(searchValue.toLowerCase()) ||
                client.phone.toLowerCase().includes(searchValue.toLowerCase())
            
            );
            setFilteredClients(filteredData);
        } else {
            setFilteredClients(clients);
        }
    }, [searchValue]);

    return <Container className="d-flex flex-column align-items-center">
        <h1>Admin Clients</h1>
        <div className="d-flex justify-content-end align-items-center w-100">
            <Form>
                <Form.Control type="text" placeholder="Rechercher un client" value={searchValue} onChange={handleChange} />
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
            data={filteredClients}
            pagination
            highlightOnHover
            responsive
        />
        <ModalCreateClients open={modalCreate} setOpen={setModalCreate} fetchClients={fetchClients} />
        <ModalUpdateClients open={modalUpdate} setOpen={setModalUpdate} fetchClients={fetchClients} currentClient={clientSelected} />
        <ModalDeleteClients open={modalDelete} setOpen={setModalDelete} fetchClients={fetchClients} currentClient={clientSelected} />
    </Container>;
}

export default AdminClientsPage;