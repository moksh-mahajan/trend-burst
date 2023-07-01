import ProfileImg from "../profileImg";
import { BsEmojiLaughing, BsFiletypeGif } from "react-icons/bs";
import { HiOutlinePhoto } from "react-icons/hi2";

export default function CreatePostCard() {
  return (
    <div className="p-4 bg-white flex space-x-4 mb-6">
      <div>
        <ProfileImg />
      </div>
      <div className="w-full">
        <textarea
          className="bg-gray-200 w-full p-2 h-28 mb-4 text-sm"
          placeholder="Write something interesting..."
        />
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <button>
              <HiOutlinePhoto />
            </button>
            <button>
              <BsFiletypeGif />
            </button>
            <button>
              <BsEmojiLaughing />
            </button>
          </div>
          <button className="px-8 py-1 text-sm bg-blue-600 text-gray-100">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
