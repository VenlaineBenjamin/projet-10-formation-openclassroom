import TransactionItem from "../transactionItem/TransactionItem";
import "./Transaction.css";

export default function Transaction() {
    return (
        <section className="info">
            <div className="info-container">
                <p>Date</p>
                <p>Description</p>
                <p>Amount</p>
                <p>Balance</p>
            </div>
            <div className="info-item">
                <TransactionItem />
                <TransactionItem />
                <TransactionItem />
                <TransactionItem />
                <TransactionItem />
            </div>
        </section>
    );
}
