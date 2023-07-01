import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts";

export default function Navbar() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div className="z-10 sticky top-0 p-4 pl-20 bg-white flex justify-between">
      <Link to={"/"} className="text-2xl font-semibold">
        <span className="text-blue-700">Trend</span>Burst
      </Link>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
