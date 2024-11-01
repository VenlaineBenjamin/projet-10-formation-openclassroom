import FeatureItem from "../../components/featureItem/FeatureItem";
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
                <FeatureItem
                    src="src/assets/img/icon-chat.png"
                    title="You are our #1 priority"
                    description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
                />
                <FeatureItem
                    src="src/assets/img/icon-money.png"
                    title="More savings means higher rates"
                    description="The more you save with us, the higher your interest rate will be!"
                />
                <FeatureItem
                    src="src/assets/img/icon-security.png"
                    title="Security you can trust"
                    description="We use top of the line encryption to make sure your data and money is always safe."
                />
            </section>
        </main>
    );
}
