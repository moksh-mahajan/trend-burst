import { useContext } from "react";
import { PostContext, UserContext } from "../contexts";
import { PostCard } from "../components";

export default function Bookmark() {
  const {
    state: { posts, isLoading },
  } = useContext(PostContext);
  const {
    state: { bookmarks },
  } = useContext(UserContext);

  let bookmarkIdArray = [];
  bookmarks.map((bookmark) => bookmarkIdArray.push(bookmark._id));
  const bookmarkPosts = posts.filter((post) =>
    bookmarkIdArray.includes(post._id)
  );

  return isLoading ? (
    <>Loading...</>
  ) : (
    <main className="w-1/2 ml-96 my-12">
      <h2 className="text-xl font-semibold">Bookmark</h2>
      {bookmarkPosts.map((post) => (
        <PostCard post={post} />
      ))}
    </main>
  );
}
