import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Transaction from "../../components/transaction/Transaction";
import { updateUserProfile } from "../../features/user/userSlice";
import "./User.css";

export default function User() {
    const dispatch = useDispatch();
    const { userName, firstName, lastName } = useSelector(
        (state) => state.user
    );
    const [useEdit, setUseEdit] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);
    const [localError, setLocalError] = useState(null); // État pour le message d'erreur
    const [activeTransaction, setActiveTransaction] = useState(null); // État pour gérer la transaction active

    useEffect(() => {
        setNewUserName(userName);
    }, [userName]);

    const handleEdit = () => {
        setUseEdit(!useEdit);
    };

    const handleSave = () => {
        if (!newUserName || newUserName.trim() === "") {
            setNewUserName(userName);
            setLocalError("Le nom d'utilisateur ne peut pas être vide !");
            setTimeout(() => setLocalError(null), 5000);
            return;
        }
        dispatch(
            updateUserProfile({
                userName: newUserName,
            })
        ).then((response) => {
            if (!response.error) {
                setUseEdit(false);
                setLocalError(null);
            } else {
                setLocalError("An error occurred while saving.");
                setTimeout(() => setLocalError(null), 5000);
            }
        });
    };

    const handleCancel = () => {
        setNewUserName(userName);
        setUseEdit(false);
        setLocalError(null);
    };

    const toggleTransactionVisibility = (account) => {
        setActiveTransaction((prevState) =>
            prevState === account ? null : account
        );
    };

    return (
        <main className="main bg-dark">
            <header className="header">
                <div>
                    <h1>
                        Welcome back{" "}
                        {useEdit ? (
                            <div className="user-form">
                                <label
                                    htmlFor="user-name"
                                    className="input-label"
                                >
                                    User name:
                                    <input
                                        type="text"
                                        value={newUserName}
                                        id="user-name"
                                        placeholder="user name"
                                        onChange={(e) =>
                                            setNewUserName(e.target.value)
                                        }
                                    />
                                </label>
                                {/* Affichage du message d'erreur sous le champ */}
                                {localError && (
                                    <p className="error-message">
                                        {localError}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <>
                                {firstName} {lastName}!
                            </>
                        )}
                    </h1>

                    {useEdit ? (
                        <>
                            <button
                                className="save-button"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="cancel-button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="edit-button" onClick={handleEdit}>
                            Edit Username
                        </button>
                    )}
                </div>
            </header>

            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Checking (x8349)
                    </h3>
                    <h4 className="account-amount">$2,082.79</h4>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button
                        className="transaction-button"
                        onClick={() => toggleTransactionVisibility("checking")}
                    >
                        {activeTransaction === "checking"
                            ? "Close panel"
                            : "View transactions"}
                    </button>
                </div>
            </section>
            {activeTransaction === "checking" && <Transaction />}
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Savings (x6712)
                    </h3>
                    <h4 className="account-amount">$10,928.42</h4>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button
                        className="transaction-button"
                        onClick={() => toggleTransactionVisibility("savings")}
                    >
                        {activeTransaction === "savings"
                            ? "Close panel"
                            : "View transactions"}
                    </button>
                </div>
            </section>
            {activeTransaction === "savings" && <Transaction />}
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <h4 className="account-amount">$184.30</h4>
                    <p className="account-amount-description">
                        Current Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button
                        className="transaction-button"
                        onClick={() => toggleTransactionVisibility("credit")}
                    >
                        {activeTransaction === "credit"
                            ? "Close panel"
                            : "View transactions"}
                    </button>
                </div>
            </section>
            {activeTransaction === "credit" && <Transaction />}
        </main>
    );
}
