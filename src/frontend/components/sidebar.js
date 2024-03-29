import { BiHome, BiUser } from "react-icons/bi";
import { BsRocket, BsBookmark, BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProfileImg from "./profileImg";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts";
import CreatePostCard from "./cards/createPostCard";
export default function Sidebar() {
  const { state } = useContext(AuthContext);
  const {
    user: { firstName, lastName, username },
  } = state;
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  const toggleCreatePostCard = () =>
    setIsCreatePostVisible(!isCreatePostVisible);
  return (
    <li className="fixed top-16 py-12 px-16 pb-20 list-none flex flex-col justify-between h-screen w-1/4 border">
      <div className="flex flex-col gap-y-4">
        <Link to={"/"}>
          <ul className="flex items-center space-x-3">
            <BiHome /> <span>Home</span>
          </ul>
        </Link>
        <Link to={"/explore"}>
          <ul className="flex items-center space-x-3">
            <BsRocket /> <span>Explore</span>
          </ul>
        </Link>
        <Link to={"/bookmark"}>
          <ul className="flex items-center space-x-3">
            <BsBookmark /> <span>Bookmark</span>
          </ul>
        </Link>
        <Link to={`/profile/${username}`}>
          <ul className="flex items-center space-x-3">
            <BiUser /> <span>Profile</span>
          </ul>
        </Link>
        <button
          onClick={() => setIsCreatePostVisible(true)}
          className="bg-blue-600 px-8 py-2 text-gray-100 text-sm"
        >
          Create New Post
        </button>
      </div>

      <div className="flex space-x-4 items-center">
        <ProfileImg />
        <Link to={`/profile/${username}`} className="leading-5">
          <h1 className="font-semibold">{`${firstName} ${lastName}`}</h1>
          <span className="text-sm text-gray-500">{`@${username}`}</span>
        </Link>
        <BsThreeDots className="text-gray-500" />
      </div>

      {isCreatePostVisible && (
        <CreatePostCard
          onPost={toggleCreatePostCard}
          isCreatePostVisible={isCreatePostVisible}
        />
      )}
    </li>
  );
}
