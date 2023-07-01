import { useContext, useEffect } from "react";
import { PostContext } from "../contexts";
import { CreatePostCard, PostCard } from "../components";

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
    <main className="w-1/2 ml-96 my-12">
      <CreatePostCard />
      <h2 className="text-xl font-semibold">Latest Posts</h2>
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
      
    </main>
  );
}
