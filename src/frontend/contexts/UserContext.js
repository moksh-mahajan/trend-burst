import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  users: [],
  isLoading: true,
};
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { users: action.payload, isLoading: false };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const getUsers = async () => {
    try {
      const response = await fetch("/api/users");

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.users);
        dispatch({ type: "SET_USERS", payload: data.users });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <UserContext.Provider value={{ state, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};
