import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "../../components/profile/Porfile";
import { logoutUser } from "../../features/auth/authSlice";
import { fetchUserProfile } from "../../features/user/userSlice";
import "./NavBar.css";

export default function NavBar() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
        dispatch(fetchUserProfile());
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="src/assets/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {!userInfo ? (
                    <Link className="main-nav-item" to="/login">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                ) : (
                    <div className="main-nav">
                        <Profile />{" "}
                        {/* Plus besoin de <Link> autour de Profile */}
                        <Link
                            className="main-nav-item"
                            to="/login"
                            onClick={handleLogout}
                        >
                            <i className="fa-solid fa-right-from-bracket"></i>
                            Sign Out
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
