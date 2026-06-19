const ErrorMessage = ({ message }) => {
    if (!message) {
        return null;
    }

    return (
        <div
            role="alert"
            style={{
                margin: "1rem 0",
                padding: "0.75rem 1rem",
                border: "1px solid #dc2626",
                borderRadius: "6px",
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
            }}
        >
            {message}
        </div>
    );
};

export default ErrorMessage;