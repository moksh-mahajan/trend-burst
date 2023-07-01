import { useContext, useEffect } from "react";
import { BsPlus, BsSearch } from "react-icons/bs";
import { AuthContext, UserContext } from "../contexts";
import ProfileImg from "./profileImg";

export default function RightSidebar() {
  const { state } = useContext(AuthContext);
  const {
    state: { users, isLoading },
    getUsers,
  } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  const peopleToFollow = users?.filter(
    (user) => user.username !== state.user.username
  );
  return (
    <div className="w-1/4 mx-11">
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
              {peopleToFollow.map(({ firstName, lastName, username }) => (
                <div className="flex my-4 justify-between">
                  <div className="flex space-x-3">
                    <ProfileImg />
                    <div>
                      <h5 className="font-semibold">{`${firstName} ${lastName}`}</h5>
                      <span className="text-gray-600">{`@${username}`}</span>
                    </div>
                  </div>
                  <button className="flex items-center text-blue-600">
                    Follow
                    <BsPlus />
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
