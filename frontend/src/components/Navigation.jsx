import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearCredentials } from "../redux/slices/authSlice";
import { HOME, BOOKMARKS, LOGIN } from "../utils/routes";

const Navigation = () => {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#000",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate(LOGIN);
  };

  const defaultStyle = {
    textDecoration: "none",
    color: "#555",
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc", marginBottom: "2rem", display: "flex", gap: "1rem" }}>
      <NavLink
        to={HOME}
        style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
        end
      >
        Home
      </NavLink>
      <NavLink
        to={BOOKMARKS}
        style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
      >
        Bookmarks
      </NavLink>
      <button onClick={handleLogout} style={{ marginLeft: "auto", padding: "0.5rem 1rem", cursor: "pointer" }}>
        Logout
      </button>
    </nav>
  );
};

export default Navigation;
