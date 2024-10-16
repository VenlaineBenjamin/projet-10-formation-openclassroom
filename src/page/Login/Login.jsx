import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import "./Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector((state) => state.auth);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(
                loginUser({ email: username, password })
            );

            if (loginUser.fulfilled.match(resultAction)) {
                navigate("/user");
            } else {
                const errorData = resultAction.payload.data;
                if (errorData.email) {
                    setEmailError(errorData.email);
                }
                if (errorData.password) {
                    setPasswordError(errorData.password);
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
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
