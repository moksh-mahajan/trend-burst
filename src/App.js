import "./App.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./frontend/contexts/AuthContext";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./frontend/pages/Home";
import Login from "./frontend/pages/login";
import Signup from "./frontend/pages/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, RequiresAuth, Sidebar } from "./frontend/components";

function App() {
  const { handleAuthStatusCheck } = useContext(AuthContext);

  useEffect(() => {
    handleAuthStatusCheck();

    <Navigate to={localStorage.getItem("authToken") ? "/" : "/login"} />;
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <ToastContainer
        style={{ fontSize: "1.4rem" }}
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequiresAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
