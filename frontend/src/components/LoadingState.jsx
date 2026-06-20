import "./LoadingState.css";

const LoadingState = ({ message = "Loading..." }) => {
    return (
        <div className="loading-state">
            <div className="loading-spinner" aria-hidden="true" />
            <p className="loading-message">{message}</p>
        </div>
    );
};

export default LoadingState;
