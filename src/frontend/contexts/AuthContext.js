import { createContext, useReducer } from "react";
import { authTokenKey } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
  authToken: "",
  user: {},
};

const authReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "AUTH_STATUS_CHECKED":
      return {
        authToken: payload.token,
        user: payload.user,
      };
    case "AUTH_SUCCESS":
      return {
        authToken: payload.encodedToken,
        user: payload.foundUser,
      };
    case "LOGGED_OUT": {
      return initialState;
    }
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const handleAuthStatusCheck = () => {
    const token = localStorage.getItem(authTokenKey) ?? "";
    const user = localStorage.getItem("user");
    dispatch({
      type: "AUTH_STATUS_CHECKED",
      payload: { token, user: user === null ? {} : JSON.parse(user) },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem("user");
    dispatch({ type: "LOGGED_OUT" });
    toast.success("Logged out!");
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const { encodedToken: token, foundUser: user } = data;
        // Save token to local storage
        localStorage.setItem(authTokenKey, token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: "AUTH_SUCCESS", payload: data });
        toast.success("You are now logged in!");
        navigate("/", { replace: true });
      }
      if (response.status === 404) {
        toast.error("Incorrect username or password!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignUp = async ({ username, password, firstName, lastName }) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        const { encodedToken: token, foundUser: user } = data;

        console.log("Token gotten from signup: ", token);

        // Save token to local storage
        localStorage.setItem(authTokenKey, token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({ type: "AUTH_SUCCESS", payload: data });
        toast.success(
          "Congratulations. Your TrendBurst Account has been created!"
        );
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        handleLogin,
        handleAuthStatusCheck,
        handleLogout,
        handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
