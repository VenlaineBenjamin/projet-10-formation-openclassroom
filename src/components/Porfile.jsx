import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/user/userSlice";
import "../page/NavBar/NavBar.css";

export default function Profile() {
    const dispatch = useDispatch();
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

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur: {error}</p>;
    }

    return (
        <a className=" profile-link">
            <i className="fa fa-user-circle"></i>
            <span className="profile-link main-nav-item">
                {newUserName ? newUserName : "Nom d'utilisateur non défini"}
            </span>
        </a>
    );
}
