import { useContext, useState } from "react";
import ProfileImg from "../profileImg";
import { UserContext } from "../../contexts";

export default function EditProfileCard({ user, setShowEditProfileModel }) {
  const [userData, setUserData] = useState({
    bio: user.bio,
    portfolioUrl: user.portfolioUrl,
  });
  const { editUser } = useContext(UserContext);
  const editUserHandler = () => {
    editUser({ ...user, ...userData });
    setShowEditProfileModel(false);
  };
  return (
    <div
      onClick={() => setShowEditProfileModel(false)}
      className="bg-blue-100 bg-opacity-70 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
    >
      <div
        className="p-4 w-1/3 bg-white space-x-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <ProfileImg />
          <div className="w-full">
            <label>Bio</label>
            <input
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
              className="bg-gray-200 w-full p-2 mb-4 text-sm"
              placeholder="Bio"
            />
          </div>
          <div className="w-full">
            <label>Portfolio Url</label>
            <input
              value={userData.portfolioUrl}
              onChange={(e) =>
                setUserData({ ...userData, portfolioUrl: e.target.value })
              }
              className="bg-gray-200 w-full p-2 mb-4 text-sm"
              placeholder="Portfolio url"
            />
          </div>
        </div>
        <div className="flex justify-end ">
          <button
            onClick={editUserHandler}
            className="px-8 py-1 text-sm bg-blue-600 text-gray-100"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
