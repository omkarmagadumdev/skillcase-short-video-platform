import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { HOME, REGISTER } from "../utils/routes";
import AuthForm from "../components/AuthForm";
import { validateRequiredFields } from "../utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginLoading, loginError } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!validateRequiredFields([email, password])) {
      setValidationError("Please fill in all fields.");
      return;
    }

    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      navigate(HOME);
    }
  };

  const fields = [
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
      title="Login"
      fields={fields}
      buttonText="Login"
      loading={loginLoading}
      error={loginError || validationError}
      onSubmit={handleSubmit}
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkTo={REGISTER}
    />
  );
};

export default Login;
