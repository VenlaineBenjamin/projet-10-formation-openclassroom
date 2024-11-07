import PropTypes from "prop-types";
import Transaction from "../../components/transaction/Transaction";
import "./AccountSection.css";

export default function AccountSection({
    title,
    accountNumber,
    amount,
    description,
    activeTransaction,
    onToggleTransaction,
    transactionId,
}) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">
                    {title} ({accountNumber})
                </h3>
                <h4 className="account-amount">{amount}</h4>
                <p className="account-amount-description">{description}</p>
            </div>
            <button
                className="transaction-button"
                onClick={() => onToggleTransaction(transactionId)}
            >
                {activeTransaction === transactionId
                    ? "Close panel"
                    : "View transactions"}
            </button>
            <div className="account-content-wrapper cta"></div>
            {activeTransaction === transactionId && <Transaction />}
        </section>
    );
}

// Ajout de PropTypes pour la validation des props
AccountSection.propTypes = {
    title: PropTypes.string.isRequired,
    accountNumber: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    activeTransaction: PropTypes.string,
    onToggleTransaction: PropTypes.func.isRequired,
    transactionId: PropTypes.string.isRequired,
};
