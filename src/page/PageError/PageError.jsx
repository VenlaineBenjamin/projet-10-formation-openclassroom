import "./PageError.css";
import { Link } from "react-router-dom";

export default function PageError() {
    return (
        <main className="main bg-dark">
            <section className="error-content">
                <i className="fa fa-exclamation-triangle error-icon"></i>
                <h1>404</h1>
                <h2>Page non trouvé</h2>
                <p>
                    Nous sommes désolés mais la page que vous recherchez
                    n&apos;existe pas.
                </p>
                <Link to="/" className="boutton">
                    Retourner sur la page d&apos;acceille
                </Link>
            </section>
        </main>
    );
}
