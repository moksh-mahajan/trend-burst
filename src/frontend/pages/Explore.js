import { useContext } from "react";
import { AuthContext, PostContext } from "../contexts";
import { PostCard } from "../components";

export default function Explore() {
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    state: { posts, isLoading },
  } = useContext(PostContext);

  const othersPosts = posts.filter((post) => post.username !== user.username);
  return isLoading ? (
    <>Loading...</>
  ) : (
    <main className="w-1/2 ml-96 my-12">
      <h2 className="text-xl font-semibold">Explore</h2>
      {othersPosts.map((post) => (
        <PostCard post={post} />
      ))}
    </main>
  );
}
