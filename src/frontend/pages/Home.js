import { useContext } from "react";
import { AuthContext } from "../contexts";

export default function Home() {
  const { handleLogout } = useContext(AuthContext);
  return (
    <div className="bg-gray-100">
      <p className="text-3xl font-bold underline">Home Page</p>
    </div>
  );
}
