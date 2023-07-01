import "./App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./frontend/contexts/AuthContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./frontend/pages/Home";
import Login from "./frontend/pages/login";
import Signup from "./frontend/pages/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { handleAuthStatusCheck } = useContext(AuthContext);
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
