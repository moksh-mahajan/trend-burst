import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LoginForm, SignUpForm } from "../components";

export default function Login() {
  const [authMode, setAuthMode] = useState("login");
  const location = useLocation();
  console.log(location);
  const toggleAuthMode = () =>
    setAuthMode((authMode) => (authMode === "login" ? "signup" : "login"));

  return authMode === "login" ? (
    <LoginForm onSignUp={toggleAuthMode} />
  ) : (
    <SignUpForm onLogin={toggleAuthMode} />
  );
}
