import { Link } from "react-router-dom";

const AuthForm = ({
  title,
  fields,
  buttonText,
  loading,
  error,
  onSubmit,
  footerText,
  footerLinkText,
  footerLinkTo,
}) => {
  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "1rem" }}>
      <h2>{title}</h2>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <br />
            <input
              id={field.id}
              type={field.type}
              value={field.value}
              onChange={field.onChange}
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginTop: "0.25rem",
              }}
            />
          </div>
        ))}
        <button type="submit" disabled={loading} style={{ padding: "0.5rem" }}>
          {loading ? "Loading..." : buttonText}
        </button>
      </form>
      <div style={{ marginTop: "1rem" }}>
        {footerText} <Link to={footerLinkTo}>{footerLinkText}</Link>
      </div>
    </div>
  );
};

export default AuthForm;
