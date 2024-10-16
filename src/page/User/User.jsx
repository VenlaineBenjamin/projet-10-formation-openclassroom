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
    const [useEdite, setUseEdite] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);

    // État unique pour garder la trace de la transaction visible
    const [activeTransaction, setActiveTransaction] = useState(null);

    useEffect(() => {
        setNewUserName(userName);
    }, [userName]);

    const handleEdite = () => {
        setUseEdite(!useEdite);
    };

    const handleSave = () => {
        dispatch(
            updateUserProfile({
                userName: newUserName,
            })
        ).then((response) => {
            if (!response.error) {
                setUseEdite(false);
            }
        });
    };

    const handleCancel = () => {
        setNewUserName(userName);
        setUseEdite(false);
    };

    // Fonction pour afficher ou masquer une transaction
    const toggleTransactionVisibility = (account) => {
        setActiveTransaction((prevState) =>
            prevState === account ? null : account
        );
    };

    return (
        <>
            <main className="main bg-dark">
                <header className="header">
                    <h1>
                        Welcome back <br />
                        {useEdite ? (
                            <div className="user-form">
                                <label
                                    htmlFor="user-name"
                                    className="input-label"
                                >
                                    User name :{" "}
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
                                <label className="input-label">
                                    First name :{" "}
                                    <input
                                        type="text"
                                        className="disabled"
                                        value={firstName}
                                        disabled
                                    />
                                </label>
                                <label className="input-label">
                                    Last name :{" "}
                                    <input
                                        type="text"
                                        className="disabled"
                                        value={lastName}
                                        disabled
                                    />
                                </label>
                            </div>
                        ) : (
                            <>
                                {firstName} {lastName} !
                            </>
                        )}
                    </h1>

                    {useEdite ? (
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
                        <button className="edit-button" onClick={handleEdite}>
                            Edit Username
                        </button>
                    )}
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
                            onClick={() =>
                                toggleTransactionVisibility("checking")
                            }
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
                            onClick={() =>
                                toggleTransactionVisibility("savings")
                            }
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
                            onClick={() =>
                                toggleTransactionVisibility("credit")
                            }
                        >
                            {activeTransaction === "credit"
                                ? "close panel"
                                : "View transactions"}
                        </button>
                    </div>
                </section>
                {activeTransaction === "credit" && <Transaction />}
            </main>
        </>
    );
}
