import { Link } from "react-router-dom";
import "./AuthForm.css";

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
    <main className="auth-page">
      <div className="auth-backdrop" aria-hidden="true" />

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">
            Welcome to Skillcase Shorts.
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={onSubmit}>
          {fields.map((field) => (
            <div key={field.id} className="auth-field">
              <label htmlFor={field.id} className="auth-label">
                {field.label}
              </label>
              <input
                id={field.id}
                className="auth-input"
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                disabled={loading}
                autoComplete={
                  field.type === "password" ? "current-password" : "off"
                }
              />
            </div>
          ))}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-spinner" aria-hidden="true" />
            ) : (
              buttonText
            )}
          </button>
        </form>

        <p className="auth-footer">
          {footerText}{" "}
          <Link to={footerLinkTo} className="auth-link">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </main>
  );
};

export default AuthForm;
