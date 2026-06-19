const EmptyState = ({ message = "No content available." }) => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    {message}
  </div>
);

export default EmptyState;
