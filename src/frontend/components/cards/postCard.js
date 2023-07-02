import { useContext } from "react";
import ProfileImg from "../profileImg";
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsFillHeartFill,
  BsHeart,
  BsShare,
} from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { AuthContext, PostContext, UserContext } from "../../contexts";

export default function PostCard({ post }) {
  const {
    state: { user },
  } = useContext(AuthContext);
  const { likePost, dislikePost } = useContext(PostContext);
  const {
    state: { bookmarks },
    addBookmark,
    removeBookmark,
  } = useContext(UserContext);

  const {
    _id,
    likes: { likeCount, likedBy },
    firstName,
    lastName,
    username,
    content,
  } = post;

  return (
    <div className="flex space-x-4 my-4 p-4 bg-white">
      <div>
        <ProfileImg />
      </div>
      <div className="pr-8 w-full">
        <div className="flex items-center space-x-2">
          <h5 className="font-semibold">{`${firstName} ${lastName}`}</h5>
          <span className="text-gray-600">{`@${username}`}</span>
          <span>.</span>
          <span className="text-gray-600">1 min</span>
        </div>
        <p className="line-clamp-6">{content}</p>
        <div className="flex justify-between mt-6">
          <>
          {likedBy.some((likedUser) => likedUser.username === user.username) ? (
            <button>
              <BsFillHeartFill onClick={() => dislikePost(_id)} />
            </button>
          ) : (
            <button>
              <BsHeart onClick={() => likePost(_id)} />
            </button>
          )}
          </>

          <button>
            <GoComment />
          </button>
          <button>
            <BsShare />
          </button>
          <>
          {bookmarks.some((bookmarkedPost) => bookmarkedPost._id === _id) ? (
            <button>
              <BsFillBookmarkFill onClick={() => removeBookmark(_id)} />
            </button>
          ) : (
            <button onClick={() => addBookmark(_id)}>
              <BsBookmark />
            </button>
          )}
          </>
        </div>
      </div>
    </div>
  );
}
