import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountSection from "../../components/accountsection/AccountSection";
import { updateUserProfile } from "../../features/user/userSlice";
import "./User.css";

export default function User() {
    const dispatch = useDispatch();
    const { userName, firstName, lastName } = useSelector(
        (state) => state.user
    );
    const [useEdit, setUseEdit] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);
    const [localError, setLocalError] = useState(null);
    const [activeTransaction, setActiveTransaction] = useState(null);

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

            {/* Utilisation du composant AccountSection pour chaque compte */}
            <AccountSection
                title="Argent Bank Checking"
                accountNumber="x8349"
                amount="$2,082.79"
                description="Available Balance"
                activeTransaction={activeTransaction}
                onToggleTransaction={toggleTransactionVisibility}
                transactionId="checking"
            />
            <AccountSection
                title="Argent Bank Savings"
                accountNumber="x6712"
                amount="$10,928.42"
                description="Available Balance"
                activeTransaction={activeTransaction}
                onToggleTransaction={toggleTransactionVisibility}
                transactionId="savings"
            />
            <AccountSection
                title="Argent Bank Credit Card"
                accountNumber="x8349"
                amount="$184.30"
                description="Current Balance"
                activeTransaction={activeTransaction}
                onToggleTransaction={toggleTransactionVisibility}
                transactionId="credit"
            />
        </main>
    );
}
