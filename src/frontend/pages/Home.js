import { useContext } from "react";
import { AuthContext } from "../contexts";

export default function Home() {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p className="text-3xl font-bold underline">Home Page</p>
    </div>
  );
}
