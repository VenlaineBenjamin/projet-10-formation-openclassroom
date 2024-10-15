import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import "./Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(
            loginUser({ email: username, password })
        );

        if (loginUser.fulfilled.match(resultAction)) {
            navigate("/user");
        } else {
            console.error("Login failed:", resultAction.payload);
        }
    };

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
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {loading && <p>Chargement...</p>}
                    {error && <p className="error-message">{error}</p>}{" "}
                    {/* Affichage des erreurs si nécessaire */}
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Se souvenir de moi</label>
                    </div>
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
