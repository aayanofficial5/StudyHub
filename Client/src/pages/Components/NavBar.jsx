import logo from "../assets/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-around items-center mt-4">
      <NavLink to="/">
        <img src={logo} className="h-8" alt="Study Notion" />
      </NavLink>
      <ul className="flex gap-5">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/">About</NavLink>
        </li>
        <li>
          <NavLink to="/">Contact</NavLink>
        </li>
      </ul>

      {!isLoggedIn? (
        <div className="flex gap-4">
          <button
            onClick={() => {navigate("/login");}}
            className="bg-gray-800 py-2 px-3 rounded-lg text-white border-1 border-gray-600 shadow-lg opacity-[70%] box-border h-11"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gray-800 py-2 px-3 rounded-lg text-white border-1 shadow-lg border-gray-600 opacity-[70%] box-border h-11"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex gap-5">
          <button
            onClick={() => {navigate(-1);setIsLoggedIn(false); toast.success("Logged Out")}}
            className="bg-gray-800 py-2 px-3 rounded-lg text-white border-1 shadow-lg border-gray-600 opacity-[70%] box-border h-11"
          >
            Log out
          </button>
          <button
            onClick={() => {setIsLoggedIn(true);navigate("/dashboard")}}
            className="bg-gray-800 py-2 px-3 rounded-lg text-white border-1 shadow-lg border-gray-600 opacity-[70%] box-border h-11"
          >
            Dashboard
          </button>
        </div>
      )}
    </nav>
  );
}
