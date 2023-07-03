import { useContext, useState } from "react";
import ProfileImg from "../profileImg";
import { formatDistanceToNow } from "date-fns";
import {
  BsBookmark,
  BsFillBookmarkFill,
  BsFillHeartFill,
  BsHeart,
  BsShare,
  BsThreeDots,
} from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { AuthContext, PostContext, UserContext } from "../../contexts";
import CreatePostCard from "./createPostCard";

function TimeAgo({ timestamp }) {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return <span>{timeAgo}</span>;
}

export default function PostCard({ post }) {
  const {
    state: { user },
  } = useContext(AuthContext);
  const { likePost, dislikePost, editPost, deletePost } =
    useContext(PostContext);
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

  const [showMore, setShowMore] = useState(false);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  const toggleCreatePostCard = () =>
    setIsCreatePostVisible(!isCreatePostVisible);

  return (
    <div
      onClick={() => setShowMore(false)}
      className="flex space-x-4 my-4 p-4 bg-white"
    >
      <div>
        <ProfileImg />
      </div>
      <div className="pr-8 w-full">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <h5 className="font-semibold">{`${firstName} ${lastName}`}</h5>
            <span className="text-gray-600">{`@${username}`}</span>
            <span>.</span>
            <span className="text-gray-600"><TimeAgo timestamp={post.createdAt} /></span>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(!showMore);
              }}
            >
              <BsThreeDots />
            </button>
            {showMore && user.username === username ? (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-4 left-6 bg-gray-300 py-1 px-4"
              >
                <button
                  onClick={() => {
                    setIsCreatePostVisible(true);
                    setShowMore(false);
                  }}
                  className="text-blue-800 p-1 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deletePost(_id);
                    setShowMore(false);
                  }}
                  className="text-blue-800 p-1 font-semibold"
                >
                  Delete
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <p className="line-clamp-6 break-words">{content}</p>
        <div className="flex justify-between mt-6">
          <button className="flex items-center gap-x-1">
            {likedBy.some(
              (likedUser) => likedUser.username === user.username
            ) ? (
              <>
                <BsFillHeartFill
                  className="text-red-500"
                  onClick={() => dislikePost(_id)}
                />
                <div className="text-red-500">{likeCount}</div>
              </>
            ) : (
              <>
                <BsHeart onClick={() => likePost(_id)} />
                <div>{likeCount}</div>
              </>
            )}
          </button>

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
      {isCreatePostVisible && (
        <CreatePostCard
          post={post}
          onPost={toggleCreatePostCard}
          isCreatePostVisible={isCreatePostVisible}
        />
      )}
    </div>
  );
}
