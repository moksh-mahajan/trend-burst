import { createContext, useReducer } from "react";
import { authTokenKey } from "../constants";

export const UserContext = createContext();

const initialState = {
  users: [],
  bookmarks: [],
  isLoading: true,
};
const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload, isLoading: false };
    case "SET_BOOKMARKS":
      return { ...state, bookmarks: action.payload, isLoading: false };
    case "SET_FOLLOW_USER":
      const currentUser = action.payload.user;
      const currentUserIndex = state.users.findIndex(
        ({ _id }) => _id === currentUser._id
      );
      state.users[currentUserIndex] = action.payload.user;

      const followedUser = action.payload.followUser;
      const followedUserIndex = state.users.findIndex(
        ({ _id }) => _id === followedUser._id
      );
      state.users[followedUserIndex] = action.payload.followUser;
      return { ...state };
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
  const addBookmark = async (postId) => {
    console.log(postId);
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers,
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "SET_BOOKMARKS", payload: data.bookmarks });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeBookmark = async (postId) => {
    console.log(postId);
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers,
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "SET_BOOKMARKS", payload: data.bookmarks });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const followUser = async (userId) => {
    console.log(userId);
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
        headers,
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        // const {user,followUser} = data;
        dispatch({ type: "SET_FOLLOW_USER", payload: data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const unfollowUser = async (userId) => {
    console.log(userId);
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/users/unfollow/${userId}`, {
        method: "POST",
        headers,
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        // const {user,followUser} = data;
        dispatch({ type: "SET_FOLLOW_USER", payload: data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        getUsers,
        addBookmark,
        removeBookmark,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
