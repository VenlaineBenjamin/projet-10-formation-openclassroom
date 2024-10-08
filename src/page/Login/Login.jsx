import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import "./Login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, userInfo } = useSelector((state) => state.auth);

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: username, password }));
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/user");
        }
        if (error) {
            // Assuming error is a string identifying which field is incorrect
            if (error.includes("email")) {
                setUsernameError(error);
                setTimeout(
                    () =>
                        setUsernameError(
                            "Ceci n'est pas la bonne adresse email"
                        ),
                    5000
                );
            }
            if (error.includes("password")) {
                setPasswordError(error);
                setTimeout(() => setPasswordError(""), 5000);
            }
        }
    }, [userInfo, error, navigate]);

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
                        {usernameError && (
                            <p className="error">{usernameError}</p>
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
                            <p className="error">{passwordError}</p>
                        )}
                    </div>
                    {loading && <p>Chargement...</p>}
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Se souvenir de moi</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        Connexion
                    </button>
                </form>
            </section>
        </main>
    );
}
