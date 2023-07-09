import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts";

export default function SignUpForm({ onLogin }) {
  const [form, setForm] = useState({});
  const { handleSignUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mt-12 flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp(form);
        }}
        className="w-1/3 flex justify-center items-center flex-col bg-white p-6"
      >
        <h3 className="text-2xl font-semibold">Sign-up</h3>

        <div className="w-full flex space-x-3">
          <div className="w-1/2 flex flex-col space-y-1">
            <label htmlFor="username">Firstname</label>
            <input
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="p-2 bg-blue-100"
              required
              type="text"
              id="Firstname"
              placeholder="Firstname"
            />
          </div>

          <div className="w-1/2 flex flex-col space-y-1">
            <label htmlFor="username">Lastname</label>
            <input
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="p-2 bg-blue-100"
              type="text"
              id="Lastname"
              placeholder="Lastname"
            />
          </div>
        </div>

        
        <div className="w-full flex flex-col space-y-1">
          <label htmlFor="signup-email">Email</label>
          <input
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-2 bg-blue-100"
            required
            type="email"
            id="signup-email"
            placeholder="Enter your email here"
          />
        </div>

        <div className="w-full flex flex-col space-y-1">
          <label htmlFor="signup-password">Password</label>
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="p-2 bg-blue-100"
            required
            type={showPassword ? "text" : "password"}
            id="signup-password"
            placeholder="*******"
          />
        </div>

        <div className="w-full my-3 space-x-1">
          <input
            onChange={() => setShowPassword((prev) => !prev)}
            type="checkbox"
          />
          <label className="checkbox-label">Show Password</label>
        </div>
        <div className="w-full flex flex-col space-y-4">
          <button type="submit" className="bg-blue-600 text-white py-2">
            Create an Account
          </button>
          <div className="space-x-1">
          <span>Already have an account? </span>
          <button onClick={onLogin} type="button">
            Login here
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}
