import { useContext } from "react";
import { BsPlus, BsSearch } from "react-icons/bs";
import { AuthContext, UserContext } from "../contexts";
import ProfileImg from "./profileImg";

export default function RightSidebar() {
  const { state } = useContext(AuthContext);
  const {
    state: { users, isLoading },
  
    followUser,
    unfollowUser,
  } = useContext(UserContext);

  

  const peopleToFollow = users?.filter(
    (user) => user.username !== state.user.username
  );
  return (
    <div className="fixed top-16 right-0 w-1/5 mx-11">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="relative">
            <span className="absolute top-14 left-4">
              <BsSearch />
            </span>
            <input
              className="my-10 p-3 pl-10 border border-blue-600 w-full outline-none"
              placeholder="Search..."
            />
          </div>
          <div className="bg-white p-4">
            <h4>Who to Follow?</h4>
            <ul>
              {peopleToFollow.map(
                ({ _id, firstName, lastName, username, followers }) => (
                  <div key={_id} className="flex my-4 justify-between">
                    <div className="flex space-x-3">
                      <ProfileImg />
                      <div>
                        <h5 className="font-semibold">{`${firstName} ${lastName}`}</h5>
                        <span className="text-gray-600">{`@${username}`}</span>
                      </div>
                    </div>
                    <div>
                      {followers.some(
                        ({ username }) => state.user.username === username
                      ) ? (
                        <button
                          onClick={() => unfollowUser(_id)}
                          className="flex items-center text-blue-600"
                        >
                          Unfollow
                          <BsPlus />
                        </button>
                      ) : (
                        <button
                          onClick={() => followUser(_id)}
                          className="flex items-center text-blue-600"
                        >
                          Follow
                          <BsPlus />
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
