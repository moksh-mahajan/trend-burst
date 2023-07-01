import { useContext, useState } from "react";
import ProfileImg from "../profileImg";
import { BsEmojiLaughing, BsFiletypeGif } from "react-icons/bs";
import { HiOutlinePhoto } from "react-icons/hi2";
import { toast } from "react-toastify";
import { PostContext } from "../../contexts";

export default function CreatePostCard({ onPost, isCreatePostVisible }) {
  const { createPost } = useContext(PostContext);
  const [postContent, setPostContent] = useState("");

  const createPostHandler = () => {
    if (postContent) {
      createPost({ content: postContent });
      setPostContent("");
      onPost();
    } else {
      toast.warning("Post can't be empty!");
    }
  };

  return (
    <div
      onClick={onPost}
      className={
        isCreatePostVisible
          ? `bg-blue-100 bg-opacity-70 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center`
          : ``
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          isCreatePostVisible ? `w-1/3` : ``
        } p-4 bg-white flex space-x-4 mb-6`}
      >
        <div>
          <ProfileImg />
        </div>
        <div className="w-full">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
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
            <button
              onClick={createPostHandler}
              className="px-8 py-1 text-sm bg-blue-600 text-gray-100"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
