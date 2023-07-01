import { createContext, useReducer } from "react";
import { authTokenKey } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
  authToken: "",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_STATUS_CHECKED":
      return {
        authToken: action.payload,
      };
    case "AUTHENTICATED":
      return {
        authToken: action.payload,
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
    dispatch({ type: "AUTH_STATUS_CHECKED", payload: token });
  };

  const handleLogout = () => {
    localStorage.removeItem(authTokenKey);
    dispatch({ type: "LOGGED_OUT" });
    toast.success("Logged out!");
  };

  const handleLogin = async ({ username, password }) => {
    console.log(username,password);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      console.log(response);

      if (response.status === 200) {
        const data = await response.json();
        const token = data.encodedToken;
        console.log(data)
        // Save token to local storage
        localStorage.setItem(authTokenKey, token);

        dispatch({ type: "AUTH_SUCCESS", payload: token });
        toast.success("You are now logged in!");
        navigate("/home")
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
        const token = data.encodedToken;

        console.log("Token gotten from signup: ", token);

        // Save token to local storage
        localStorage.setItem(authTokenKey, token);

        dispatch({ type: "AUTH_SUCCESS", payload: token });
        toast.success(
          "Congratulations. Your TrendBurst Account has been created!"
        );
        navigate("/home");
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
