import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import "./TransactionItem.css";

export default function TransactionItem() {
    const [activeTransactionDetail, setActiveTransactionDetail] =
        useState(null);

    const toggleTransactionDetail = (account) => {
        setActiveTransactionDetail((prevState) => {
            return prevState === account ? null : account;
        });
    };

    return (
        <div className="transaction-container">
            <div className="transaction-header">
                <p>27/02/20</p>
                <p>Golden Sun Bakery</p>
                <p>$8.00</p>
                <p>$298.00</p>
                <FaChevronDown
                    className="chevron-down"
                    onClick={() => toggleTransactionDetail("checking")}
                />
            </div>
            {activeTransactionDetail === "checking" && (
                <div className="transaction-body">
                    <div className="transaction-title">
                        <p>Transaction type</p>
                        <p>Category</p>
                        <p>Note</p>
                    </div>
                    <div className="transaction-info">
                        <p>Electronic</p>
                        <div className="transaction-dropdown">
                            <p>Food</p>
                            <GoPencil className="pencil" />
                        </div>
                        <div className="transaction-note">
                            <p>Lorem ipsum</p>
                            <GoPencil className="pencil" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
