import { useContext } from "react";
import { AuthContext } from "../contexts";

export default function Home() {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Home Page</h2>
    </div>
  );
}
