import { useContext } from "react";
import { PostContext } from "../contexts";
import { CreatePostCard, PostCard } from "../components";

export default function Home() {
  const {
    state: { posts, isLoading, sortBy },
    dispatch,
  } = useContext(PostContext);

  let sortedPosts = posts;

  if (sortBy === "trending") {
    sortedPosts = posts.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  } else if (sortBy === "latest") {
    sortedPosts = posts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return isLoading ? (
    <>Loading...</>
  ) : (
    <main className="w-1/2 mx-96 my-12">
      <CreatePostCard />
      <h2 className="text-xl font-semibold">Latest Posts</h2>
      <div className="flex space-x-4 mt-4">
      <button className="text-blue-600 rounded-lg px-2 border border-blue-600" onClick={() => dispatch({ type: "SORT_BY_TRENDING" })}>
        Trending
      </button>
      <button className="text-blue-600 rounded-lg px-2 border border-blue-600" onClick={() => dispatch({ type: "SORT_BY_LATEST" })}>
        Latest
      </button>
      </div>
      {sortedPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </main>
  );
}
