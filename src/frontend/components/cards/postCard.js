import ProfileImg from "../profileImg";
import { BsBookmark, BsHeart, BsShare } from "react-icons/bs";
import { GoComment } from "react-icons/go";

export default function PostCard({ post }) {
  const { firstName, lastName, username, content } = post;
  return (
    <div className="flex space-x-4 my-4 p-4 bg-white">
      <div>
        <ProfileImg />
      </div>
      <div className="pr-8">
        <div className="flex items-center space-x-2">
          <h5 className="font-semibold">{`${firstName} ${lastName}`}</h5>
          <span className="text-gray-600">{`@${username}`}</span>
          <span>.</span>
          <span>1 min</span>
        </div>
        <p className="line-clamp-6">{content}</p>
        <div className="flex justify-between mt-6">
          <button>
            <BsHeart />
          </button>
          <button>
            <GoComment />
          </button>
          <button>
            <BsShare />
          </button>
          <button>
            <BsBookmark />
          </button>
        </div>
      </div>
    </div>
  );
}
