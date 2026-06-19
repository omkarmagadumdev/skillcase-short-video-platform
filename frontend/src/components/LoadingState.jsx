const LoadingState = ({ message = "Loading..." }) => {
    return (
        <div
            style={{
                padding: "2rem",
                textAlign: "center",
            }}
        >
            {message}
        </div>
    );
};

export default LoadingState;