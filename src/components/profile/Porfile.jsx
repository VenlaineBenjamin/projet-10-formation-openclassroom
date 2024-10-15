import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../features/user/userSlice";
import "../../page/NavBar/NavBar.css";

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection
    const { userName, error, loading } = useSelector((state) => state.user);
    const [newUserName, setNewUserName] = useState("");

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (userName) {
            setNewUserName(userName);
        }
    }, [userName]);

    const handleProfileClick = () => {
        navigate("/user"); // Rediriger vers la page /user lors du clic
    };

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur: {error}</p>;
    }

    return (
        <div
            className="profile-link"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
        >
            <i className="fa fa-user-circle"></i>
            <span className="profile-link main-nav-item">
                {newUserName ? newUserName : "Nom d'utilisateur non défini"}
            </span>
        </div>
    );
}
