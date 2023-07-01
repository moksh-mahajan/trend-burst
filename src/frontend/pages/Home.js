import { useContext, useEffect } from "react";
import { PostContext } from "../contexts";
import { PostCard } from "../components";

export default function Home() {
  const {
    state: { posts, isLoading },
    getPosts,
  } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);
  return isLoading ? (
    <>Loading...</>
  ) : (
    <main className="w-1/2 ml-96">
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </main>
  );
}
