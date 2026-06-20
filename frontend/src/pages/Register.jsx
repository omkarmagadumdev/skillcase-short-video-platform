import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/slices/authSlice";
import { LOGIN } from "../utils/routes";
import AuthForm from "../components/AuthForm";
import { validateRequiredFields } from "../utils/validation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading, registerError } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!validateRequiredFields([username, email, password])) {
      setValidationError("Please fill in all fields.");
      return;
    }

    const resultAction = await dispatch(register({ username, email, password }));

    if (register.fulfilled.match(resultAction)) {
      navigate(LOGIN);
    }
  };

  const fields = [
    {
      id: "username",
      label: "Username",
      type: "text",
      value: username,
      onChange: (e) => setUsername(e.target.value),
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <AuthForm
      title="Create account"
      fields={fields}
      buttonText="Sign up"
      loading={registerLoading}
      error={registerError || validationError}
      onSubmit={handleSubmit}
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo={LOGIN}
    />
  );
};

export default Register;
