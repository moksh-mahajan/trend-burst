import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts";

export default function LoginForm({ onSignUp }) {
  const [form, setForm] = useState({});
  const { handleLogin } = useContext(AuthContext);
  const handleGuestLogin = () => {
    handleLogin({ username: "adarshbalika", password: "adarshBalika123" });
  };
  const handleFormLogin = () => {
    handleLogin(form);
  };
  return (
    <div className="auth-section">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="auth-form"
      >
        <div className="auth-heading">
          <h3>Login</h3>
          {/* <img className="auth-img" src={authImg} alt="authentication img" /> */}
        </div>

        <div className="auth-input">
          <label htmlFor="email">Username</label>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="auth-field"
            type="username"
            id="username"
            placeholder="Username"
          />
        </div>

        <div className="auth-input">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="auth-field"
            type="password"
            id="password"
            placeholder="*******"
          />
        </div>

        <div className="flex gap-x-4">
          <button
            onClick={() => handleFormLogin()}
            type="submit"
            className="auth-btn"
          >
            Login
          </button>
          <button onClick={() => handleGuestLogin()} className="auth-btn">
            Guest Login
          </button>
          <span>Don't have an account?</span>
          <button onClick={onSignUp} type="button" className="auth-link">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}
