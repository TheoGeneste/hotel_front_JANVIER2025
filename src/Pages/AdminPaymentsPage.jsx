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
import PaymentsService from "../Services/PaymentsService";
import ModalCreatePayment from "../Components/ModalCreatePayment";
import ModalUpdatePayment from "../Components/ModalUpdatePayment";
import ModalDeletePayment from "../Components/ModalDeletePayment";

const AdminPaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [paymentSelected, setPaymentSelected] = useState(null);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [filteredPayments, setFilteredPayments] = useState([]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id_payment,
            sortable: true
        },
        {
            name: 'Date',
            selector: row => moment(row.payment_date).format('DD/MM/YYYY'),
            sortable: true
        },
        {
            name: 'Total',
            selector: row => row.amount,
            sortable: true
        },
        {
            name: 'Méthode de paiement',
            selector: row => row.payment_method,
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row) => <div>
                <Tooltip title="Modifier le paiment">
                    <IconButton onClick={() => {
                        setPaymentSelected(row);
                        setModalUpdate(true);
                    }}>
                        <EditIcon color="action" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer le paiment">
                    <IconButton onClick={() => {
                        setPaymentSelected(row);
                        setModalDelete(true);
                    }}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Tooltip>
            </div>
        }
    ];

    const fetchPayments = async () => {
        try {
            const response = await PaymentsService.getPayments();
            setPayments(response.data);
            setFilteredPayments(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchPayments();
    }, []);

    useEffect(() => {
        if (searchValue) {
            const filteredData = payments.filter(payment =>
                payment.id_payment.toString().includes(searchValue) ||
                payment.payment_date.includes(searchValue) ||
                payment.amount.toString().includes(searchValue) ||
                payment.payment_method.includes(searchValue)
            );
            setFilteredPayments(filteredData);
        } else {
            setFilteredPayments(payments);
        }
    }, [searchValue]);

    return <Container className="d-flex flex-column align-items-center">
        <h1>Admin Payments</h1>
        <div className="d-flex justify-content-end align-items-center w-100">
            <Form>
                <Form.Control type="text" placeholder="Rechercher un payment" value={searchValue} onChange={handleChange} />
            </Form>
            <Tooltip title="Ajouter un payment">
                <IconButton size="large" onClick={() => setModalCreate(true)}>
                    <AddIcon color="info" fontSize="large" />
                </IconButton>
            </Tooltip>
        </div>
        <DataTable
            striped
            columns={columns}
            data={filteredPayments}
            pagination
            highlightOnHover
            responsive
        />
        <ModalCreatePayment open={modalCreate} setOpen={setModalCreate} fetchPayments={fetchPayments} />
        <ModalUpdatePayment open={modalUpdate} setOpen={setModalUpdate} fetchPayments={fetchPayments} currentPayment={paymentSelected} />
        <ModalDeletePayment open={modalDelete} setOpen={setModalDelete} fetchPayments={fetchPayments} currentPayment={paymentSelected} />
    </Container>;
}

export default AdminPaymentsPage;