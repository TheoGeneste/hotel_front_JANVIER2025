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
import ServicesService from "../Services/ServicesService";
import ModalCreateServices from "../Components/ModalCreateServices";
import ModalUpdateServices from "../Components/ModalUpdateServices";
import ModalDeleteServices from "../Components/ModalDeleteServices";

const AdminServicesPage = () => {
    const [services, setServices] = useState([]);
    const [serviceSelected, setServiceSelected] = useState(null);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id_service,
            sortable: true
        },
        {
            name: 'Name',
            selector: row => row.service_name,
            sortable: true
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true
        },

        {
            name: 'Coût',
            selector: row => row.price,
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row) => <div>
                <Tooltip title="Modifier le Service">
                    <IconButton onClick={() => {
                        setServiceSelected(row);
                        setModalUpdate(true);
                    }}>
                        <EditIcon color="action" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer le Service">
                    <IconButton onClick={() => {
                        setServiceSelected(row);
                        setModalDelete(true);
                    }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </div>
        }
    ];

    const fetchServices = async () => {
        try {
            const response = await ServicesService.getServices();
            setServices(response.data);
            setFilteredServices(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (searchValue) {
            const filteredData = services.filter(service =>
                service.service_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                service.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                service.price.toString().includes(searchValue)
            );
            setFilteredServices(filteredData);
        } else {
            setFilteredServices(services);
        }
    }, [searchValue]);

    return <Container className="d-flex flex-column align-items-center">
        <h1>Admin Services</h1>
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
            data={filteredServices}
            pagination
            highlightOnHover
            responsive
        />
        <ModalCreateServices open={modalCreate} setOpen={setModalCreate} fetchServices={fetchServices} />
        <ModalUpdateServices open={modalUpdate} setOpen={setModalUpdate} fetchServices={fetchServices} currentService={serviceSelected} />
        <ModalDeleteServices open={modalDelete} setOpen={setModalDelete} fetchServices={fetchServices} currentServices={serviceSelected} />
    </Container>;
}

export default AdminServicesPage;