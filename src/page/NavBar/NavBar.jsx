import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import "./NavBar.css";

export default function NavBar() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="src/assets/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                    onClick={handleLogout}
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
                    <Link
                        className="main-nav-item"
                        to="/"
                        onClick={handleLogout}
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Sign Out
                    </Link>
                )}
            </div>
        </nav>
    );
}
