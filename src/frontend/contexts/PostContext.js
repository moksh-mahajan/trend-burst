import { createContext, useReducer } from "react";
import { authTokenKey } from "../constants";

export const PostContext = createContext();

const initialState = {
  posts: [],
  isLoading: true,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { posts: action.payload, isLoading: false };
    case "SORT_BY_TRENDING":
      console.log("TRENDINGGNGNG");
      state.posts.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
      return { ...state };
    case "SORT_BY_LATEST":
      state.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return { ...state };
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
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editPost = async (postId, postData) => {
    try {
      const token = localStorage.getItem(authTokenKey);
      console.log(token);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        body: JSON.stringify({ postData }),
        headers,
      });
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
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
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
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
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
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
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
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
