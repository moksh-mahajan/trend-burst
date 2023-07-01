import { useContext, useState } from "react";
// import authImg from "../../../assets/svgs/authImg.svg";
import { AuthContext } from "../../../contexts";
// import "./AuthForm.css";

export default function SignUpForm({ onLogin }) {
  const [form, setForm] = useState({});
  const { handleSignUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-section">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp(form);
        }}
        className="auth-form"
      >
        <div className="auth-heading">
          <h3>Sign-up</h3>
          {/* <img className="auth-img" src={authImg} alt="authentication img" /> */}
        </div>

        <div className="two-field-section">
          <div className="auth-input">
            <label htmlFor="username">Firstname</label>
            <input
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="auth-field"
              required
              type="text"
              id="Firstname"
              placeholder="Firstname"
            />
          </div>

          <div className="auth-input">
            <label htmlFor="username">Lastname</label>
            <input
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="auth-field"
              type="text"
              id="Lastname"
              placeholder="Lastname"
            />
          </div>
        </div>
        <div className="auth-input">
          <label htmlFor="signup-email">Email</label>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="auth-field"
            required
            type="email"
            id="signup-email"
            placeholder="Enter your email here"
          />
        </div>

        <div className="auth-input">
          <label htmlFor="signup-password">Password</label>
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="auth-field"
            required
            type={showPassword ? "text" : "password"}
            id="signup-password"
            placeholder="*******"
          />
        </div>

        <div className="auth-input auth-checkbox">
          <input
            onChange={() => setShowPassword((prev) => !prev)}
            type="checkbox"
          />
          <label className="checkbox-label">Show Password</label>
        </div>
        <div className="auth-footer">
          <button type="submit" className="auth-btn">
            Create an Account
          </button>
          <span className="auth-span">Already have an account? </span>
          <button onClick={onLogin} type="button" className="auth-link">
            Login here
          </button>
        </div>
      </form>
    </div>
  );
}