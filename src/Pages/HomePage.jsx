import { Container } from "react-bootstrap";
import '../Styles/HomePage.css'; // Assurez-vous de créer ce fichier CSS

const HomePage = () => {
    return <div className="homepage-background">
        <Container className="d-flex flex-column align-items-center text-white">
            <h1>Hotel ForEach</h1>
            <p>Bienvenue à l'Hotel ForEach, où chaque séjour est unique.</p>
        </Container>
    </div>
        ;
}

export default HomePage;