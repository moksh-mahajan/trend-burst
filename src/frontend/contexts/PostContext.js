import { createContext, useReducer } from "react";
import { authTokenKey } from "../constants";

export const PostContext = createContext();

const initialState = {
  posts: [],
  isLoading:true,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return { posts: action.payload,isLoading:false };
    default:
      return state;
  }
};

export function PostProvider({ children }) {

  const [ state, dispatch ] = useReducer(postReducer, initialState);

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
  const createPost = async(postData) => {
    console.log(postData)
    try {
      const token = localStorage.getItem(authTokenKey);
      const headers = new Headers();
      headers.append("Authorization", "Bearer " + token);
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({postData}),
        headers,
      });
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        console.log(data);
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.log(e)
    }
  }

  const likePost = async(postId) => {
    console.log(postId)
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
      console.log(e)
    }
  }
  const dislikePost = async(postId) => {
    console.log(postId)
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
      console.log(e)
    }
  }
  return (
    <PostContext.Provider value={{ state, getPosts,createPost,likePost,dislikePost }}>
      {children}
    </PostContext.Provider>
  );
}
