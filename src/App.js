import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./frontend/contexts/AuthContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./frontend/pages/Home";
import Login from "./frontend/pages/login";
import Signup from "./frontend/pages/signup";

function App() {
  const { isAuthenticated, handleAuthStatusCheck, handleLogout } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleAuthStatusCheck();
  }, []);

  return (
    <div>
      <ToastContainer
        style={{ fontSize: "1.4rem" }}
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <button
        onClick={() => {
          isAuthenticated ? handleLogout() : navigate("/login");
        }}
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
      {!isAuthenticated && (
        <button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </button>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
