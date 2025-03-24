import { useEffect, useState } from "react";
import ServiceCard from "../Components/ServiceCard";
import ServicesService from "../Services/ServicesService";
import { Container } from "react-bootstrap";

const ServicesPage = () => {
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        try {
            const response = await ServicesService.getServices();
            setServices(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return <Container className="d-flex flex-column align-items-center">
    <h1 className="mb-4">Nos Services</h1>
    <div className="d-flex flex-wrap justify-content-center  gap-3">
        {services.map((service, index) => {
            return <ServiceCard key={index} service={service} />
        })}
    </div>
</Container>;
}
 
export default ServicesPage;