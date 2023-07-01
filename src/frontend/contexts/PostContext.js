import { createContext, useReducer } from "react";

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
        console.log(data.posts);
        dispatch({ type: "SET_POSTS", payload: data.posts });
      }
    } catch (e) {
      console.error(e);
    }

  };
  return (
    <PostContext.Provider value={{ state, getPosts }}>
      {children}
    </PostContext.Provider>
  );
}
