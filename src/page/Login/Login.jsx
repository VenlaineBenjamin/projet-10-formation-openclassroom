import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import "./Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(""); // État pour l'erreur d'email
    const [passwordError, setPasswordError] = useState(""); // État pour l'erreur de mot de passe
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setEmailError(""); // Réinitialiser l'erreur d'email
        setPasswordError(""); // Réinitialiser l'erreur de mot de passe
        try {
            const resultAction = await dispatch(
                loginUser({ email: username, password })
            );
            if (loginUser.fulfilled.match(resultAction)) {
                navigate("/user");
            } else {
                const errorData = resultAction.payload;
                if (errorData && errorData.message) {
                    // Vérification de l'email
                    if (errorData.message.toLowerCase().includes("email")) {
                        setEmailError("L'adresse e-mail est incorrecte.");
                    } else if (
                        errorData.message.toLowerCase().includes("password")
                    ) {
                        setPasswordError("Le mot de passe est incorrect.");
                    } else {
                        setEmailError("Nom d'utilisateur ou email incorrect.");
                    }
                } else {
                    setEmailError("Nom d'utilisateur ou email incorrect.");
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            setEmailError("Une erreur est survenue lors de la connexion.");
        }
    };

    // Effacer les messages d'erreur après 5 secondes
    useEffect(() => {
        const timer = setTimeout(() => {
            setEmailError("");
            setPasswordError("");
        }, 5000);
        return () => clearTimeout(timer);
    }, [emailError, passwordError]);

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Connexion</h1>
                <form onSubmit={handleSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Nom d&apos;utilisateur</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {emailError && (
                            <p className="error-message">{emailError}</p>
                        )}
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <p className="error-message">{passwordError}</p>
                        )}
                    </div>
                    {loading && <p>Chargement...</p>}
                    <button
                        type="submit"
                        className="sign-in-button"
                        disabled={loading}
                    >
                        Connexion
                    </button>
                </form>
            </section>
        </main>
    );
}
