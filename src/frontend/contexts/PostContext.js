import { createContext, useReducer } from "react";
import { authTokenKey } from "../constants";

export const PostContext = createContext();

const initialState = {
  posts: [],
  isLoading: true,
  sortBy: "latest",
};

const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload, isLoading: false };
    case "SORT_BY_TRENDING":
      return { ...state, sortBy: "trending" };
    case "SORT_BY_LATEST":
      return { ...state, sortBy: "latest" };
    default:
      return state;
  }
};

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  const getPosts = async () => {
    try {
      const response = await fetch("/api/posts");

      if (response.status === 200) {
        const data = await response.json();
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const createPost = async (postData) => {
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ postData }),
        headers,
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editPost = async (postId, postData) => {
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        body: JSON.stringify({ postData }),
        headers,
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost = async (postId, postData) => {
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers,
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const likePost = async (postId) => {
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers,
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };
  const dislikePost = async (postId) => {
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/posts/dislike/${postId}`, {
        method: "POST",
        headers,
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
        getPosts,
        createPost,
        editPost,
        deletePost,
        likePost,
        dislikePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
