import "./HeroHeader.css";

export default function HeroHeader() {
    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <h3 className="subtitle">No fees.</h3>
                    <h3 className="subtitle">No minimum deposit.</h3>
                    <h3 className="subtitle">High interest rates.</h3>
                    <h3 className="text">
                        Open a savings account with Argent Bank today!
                    </h3>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                <div className="feature-item">
                    <img
                        src="src/assets/img/icon-chat.png"
                        alt="Chat Icon"
                        className="feature-icon"
                    />
                    <h3 className="feature-item-title">
                        You are our #1 priority
                    </h3>
                    <p>
                        Need to talk to a representative? You can get in touch
                        through our 24/7 chat or through a phone call in less
                        than 5 minutes.
                    </p>
                </div>
                <div className="feature-item">
                    <img
                        src="src/assets/img/icon-money.png"
                        alt="Money Icon"
                        className="feature-icon"
                    />
                    <h3 className="feature-item-title">
                        More savings means higher rates
                    </h3>
                    <p>
                        The more you save with us, the higher your interest rate
                        will be!
                    </p>
                </div>
                <div className="feature-item">
                    <img
                        src="src/assets/img/icon-security.png"
                        alt="shield Icon"
                        className="feature-icon"
                    />
                    <h3 className="feature-item-title">
                        Security you can trust
                    </h3>
                    <p>
                        We use top of the line encryption to make sure your data
                        and money is always safe.
                    </p>
                </div>
            </section>
        </main>
    );
}
