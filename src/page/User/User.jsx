import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../features/user/userSlice";
import "./User.css";

export default function User() {
    const dispatch = useDispatch();
    const { userName, firstName, lastName } = useSelector(
        (state) => state.user
    );
    const [useEdite, setUseEdite] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);

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

    return (
        <>
            <main className="main bg-dark">
                <div className="header">
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
                </div>
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
                        <button className="transaction-button">
                            View transactions
                        </button>
                    </div>
                </section>
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
                        <button className="transaction-button">
                            View transactions
                        </button>
                    </div>
                </section>
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
                        <button className="transaction-button">
                            View transactions
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
