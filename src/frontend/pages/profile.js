import { useParams } from "react-router-dom";
import ProfileImg from "../components/profileImg";
import { useContext, useState } from "react";
import { AuthContext, PostContext, UserContext } from "../contexts";
import { EditProfileCard, PostCard } from "../components";

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

  return (
    <main className="w-1/2 mx-96 my-12">
      <ProfileCard user={user} numberOfPosts={userPosts.length} />
      {userPosts.map((post) => (
        <PostCard post={post} />
      ))}
    </main>
  );
}

function ProfileCard({ user, numberOfPosts }) {
  const {
    username,
    firstName,
    lastName,
    followers,
    following,
    bio,
    portfolioUrl,
  } = user;
  const { state: authState } = useContext(AuthContext);
  const isMe = authState.user.username === username;
  const [showEditProfileModel, setShowEditProfileModel] = useState(false);
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-2 my-4 p-4 bg-white">
      <ProfileImg />
      <p className="font-semibold text-xl">
        {firstName} {lastName}
      </p>
      {isMe && (
        <button
          className="border px-4 py-1 border-blue-600 text-blue-600"
          onClick={() => setShowEditProfileModel(true)}
        >
          Edit Profile
        </button>
      )}
      <p>@{username}</p>
      <p>{bio}</p>
      <p className="text-red-600 underline">{portfolioUrl}</p>
      <div className="flex space-x-6 text-lg font-semibold">
        <p>{followers.length} Followers</p>
        <p>{following.length} Following</p>
        <p>{numberOfPosts} posts</p>
      </div>
      {showEditProfileModel ? (
        <EditProfileCard
          user={user}
          setShowEditProfileModel={setShowEditProfileModel}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
