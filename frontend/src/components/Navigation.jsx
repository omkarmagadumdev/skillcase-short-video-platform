import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaBookmark } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { clearCredentials } from "../redux/slices/authSlice";
import { HOME, BOOKMARKS, LOGIN } from "../utils/routes";
import "./Navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate(LOGIN);
  };

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link nav-link--active" : "nav-link";

  return (
    <header className="nav-floating">
      <nav className="nav-pill nav-pill--left">
        <NavLink to={HOME} className={linkClass}>
          <FaHome />
          <span>Home</span>
        </NavLink>

        <NavLink to={BOOKMARKS} className={linkClass}>
          <FaBookmark />
          <span>Bookmarks</span>
        </NavLink>
      </nav>

      <div className="nav-pill nav-pill--right">
        <button
          type="button"
          className="nav-logout"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navigation;
