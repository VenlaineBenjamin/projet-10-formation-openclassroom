import PropTypes from "prop-types";
import "./FeatureItem.css";

const FeatureItem = ({ src, title, description }) => {
    return (
        <div className="feature-item">
            <img src={src} alt={title} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

FeatureItem.propTypes = {
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default FeatureItem;
