import { useParams } from "react-router-dom";
import ProfileImg from "../components/profileImg";
import { useContext } from "react";
import { AuthContext, PostContext, UserContext } from "../contexts";
import { PostCard } from "../components";

export default function Profile() {
  const { username } = useParams();
  const {
    state: { users },
  } = useContext(UserContext);

  const {
    state: { posts },
  } = useContext(PostContext);

  const user = users.find((user) => user.username === username);
  const userPosts = posts.filter((post) => post.username === username);
  console.log("userPosts", posts);

  return (
    <main className="w-1/2 ml-96 my-12">
      <ProfileCard user={user} numberOfPosts={userPosts.length} />
      {userPosts.map((post) => (
        <PostCard post={post} />
      ))}
    </main>
  );
}

function ProfileCard({ user, numberOfPosts }) {
  const { username, firstName, lastName, followers, following } = user;
  const { state: authState } = useContext(AuthContext);
  const isMe = authState.user.username === username;

  return (
    <div>
      <ProfileImg />
      <p>
        {firstName} {lastName}
      </p>
      <p>@{username}</p>
      <p>{followers.length} Followers</p>
      <p>{following.length} Following</p>
      <p>{numberOfPosts} posts</p>
      {isMe && <button>Edit Profile</button>}
    </div>
  );
}
