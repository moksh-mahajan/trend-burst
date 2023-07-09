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
    <div className="w-full mt-12 flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-1/3 flex justify-center items-center flex-col bg-white p-6"
      >
        <h3 className="text-2xl font-semibold">Login</h3>

        <div className="w-full flex flex-col space-y-1">
          <label htmlFor="email">Username</label>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="p-2"
            type="username"
            id="username"
            placeholder="Username"
          />
        </div>

        <div className="w-full flex flex-col space-y-1">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="p-2"
            type="password"
            id="password"
            placeholder="*******"
          />
        </div>

        <div className="w-full flex flex-col gap-x-4">
          <div className="flex flex-col my-4 space-y-4">
            <button
              onClick={() => handleFormLogin()}
              type="submit"
              className="bg-blue-600 text-white py-2"
            >
              Login
            </button>
            <button
              onClick={() => handleGuestLogin()}
              className="text-blue-600 border border-blue-600 py-2"
            >
              Guest Login
            </button>
          </div>
          <div className="space-x-1">
            <span>Don't have an account?</span>
            <button onClick={onSignUp} type="button" className="text-blue-600">
              Signup
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
