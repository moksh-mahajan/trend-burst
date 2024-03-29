import "./App.css";
import { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./frontend/pages/Home";
import Login from "./frontend/pages/login";
import Signup from "./frontend/pages/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Navbar,
  RequiresAuth,
  RightSidebar,
  Sidebar,
} from "./frontend/components";
import Explore from "./frontend/pages/Explore";
import { AuthContext, PostContext, UserContext } from "./frontend/contexts";
import Bookmark from "./frontend/pages/Bookmark";
import Profile from "./frontend/pages/profile";

function App() {
  const { handleAuthStatusCheck } = useContext(AuthContext);
  const { getPosts } = useContext(PostContext);
  const { getUsers } = useContext(UserContext);
  useEffect(() => {
    handleAuthStatusCheck();

    <Navigate to={localStorage.getItem("authToken") ? "/" : "/login"} />;
  }, []);

  useEffect(() => {
    getUsers();
    getPosts();
  }, []);

  const location = useLocation();
  return (
    <div>
      <Navbar />
      <ToastContainer
        style={{ fontSize: "0.8rem" }}
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />

      <div className="flex">
        {location.pathname == ("/login" || "/signup") ? <></> : <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<RequiresAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Route>
        </Routes>

        {location.pathname == ("/login" || "/signup") ? (
          <></>
        ) : (
          <RightSidebar />
        )}
      </div>
    </div>
  );
}

export default App;
